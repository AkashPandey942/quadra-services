import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  // Providers – add more if you need them
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Store sessions / users in MongoDB
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      // expose a role if you store it, otherwise default to "user"
      (session.user as any).role = (user as any).role ?? "user";
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
