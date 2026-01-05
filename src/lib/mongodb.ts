import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build") {
  console.warn("MONGODB_URI is missing in production runtime!");
}

// Build-time safety: Skip connection during Next.js build phase
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

if (isBuildPhase || !uri) {
  // During build, we provide a promise that resolves safely but doesn't connect.
  // We use a dummy client if needed, but the key is NOT calling .connect()
  clientPromise = Promise.resolve(new MongoClient("mongodb://localhost:27017/dummy")) as any;
} else if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR.
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production runtime
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
