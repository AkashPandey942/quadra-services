import { connectDB } from "@/lib/db";
import Lead from "@/models/lead";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();
  await Lead.create(body);
  return Response.json({ success: true });
}
