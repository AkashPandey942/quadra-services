import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Testimonial from "@/models/Testimonial";

// GET all APPROVED testimonials
export async function GET() {
  try {
    await connectDB();
    const testimonials = await Testimonial.find({ status: "approved" }).sort({ date: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET Testimonials Error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// POST a new PENDING testimonial
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, testimonial, rating } = body;

    if (!name || !role || !company || !testimonial || !rating) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();
    
    const newTestimonial = new Testimonial({
      name,
      role,
      company,
      testimonial,
      rating,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      submittedAt: new Date()
    });

    await newTestimonial.save();

    return NextResponse.json({ message: "Testimonial submitted successfully, pending approval." }, { status: 201 });
  } catch (error) {
    console.error("POST Testimonial Error:", error);
    return NextResponse.json({ error: "Failed to submit testimonial" }, { status: 500 });
  }
}
