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

// GET all testimonials (for admin)
export async function GET() {
  try {
    const testimonials = await getTestimonials();
    // Sort by submittedAt descending
    testimonials.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("Admin GET Testimonials Error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

// PUT (Edit/Update status) a testimonial
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    // Use _id if id is not present (legacy support or frontend specific)
    const targetId = id || body._id;

    if (!targetId) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    const testimonials = await getTestimonials();
    const index = testimonials.findIndex((t: any) => t._id === targetId);

    if (index === -1) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    // Update fields
    testimonials[index] = { ...testimonials[index], ...updateData };
    await saveTestimonials(testimonials);

    return NextResponse.json({ message: "Testimonial updated successfully", testimonial: testimonials[index] });
  } catch (error) {
    console.error("Admin PUT Testimonial Error:", error);
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

// DELETE a testimonial
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Testimonial ID is required" }, { status: 400 });
    }

    let testimonials = await getTestimonials();
    const initialLength = testimonials.length;
    testimonials = testimonials.filter((t: any) => t._id !== id);

    if (testimonials.length === initialLength) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }

    await saveTestimonials(testimonials);

    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Admin DELETE Testimonial Error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
