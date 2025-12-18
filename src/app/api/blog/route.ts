import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();
  const blogs = await Blog.find();
  return Response.json(blogs);
}
