import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src", "data", "testimonials.json");

// Helper to read testimonials
async function getTestimonials() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to write testimonials
async function saveTestimonials(testimonials: any[]) {
  await fs.writeFile(filePath, JSON.stringify(testimonials, null, 2), "utf-8");
}

// GET all APPROVED testimonials
export async function GET() {
  try {
    const testimonials = await getTestimonials();
    const approvedTestimonials = testimonials
      .filter((t: any) => t.status === "approved")
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return NextResponse.json(approvedTestimonials);
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

    const testimonials = await getTestimonials();
    
    const newTestimonial = {
      _id: Date.now().toString(), // Generate a simple ID
      name,
      role,
      company,
      testimonial,
      rating,
      status: "pending",
      date: new Date().toISOString().split('T')[0],
      submittedAt: new Date().toISOString()
    };

    testimonials.push(newTestimonial);
    await saveTestimonials(testimonials);

    return NextResponse.json({ message: "Testimonial submitted successfully, pending approval." }, { status: 201 });
  } catch (error) {
    console.error("POST Testimonial Error:", error);
    return NextResponse.json({ error: "Failed to submit testimonial" }, { status: 500 });
  }
}
