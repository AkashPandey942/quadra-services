import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI);

// NextAuth expects a promise that resolves to the MongoClient
export default client.connect();
