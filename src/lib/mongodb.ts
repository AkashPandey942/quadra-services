import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI);

// Export a promise that resolves to the DB instance – NextAuth expects this shape
export default client.connect().then((c) => c.db());
