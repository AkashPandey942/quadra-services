import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

/* ===============================
   TYPES
================================ */
interface Blog {
  slug: string;
  status: "draft" | "published";
  views?: number;
  updatedAt?: string;
  createdAt?: string;
  [key: string]: unknown;
}

/* ===============================
   AUTH
================================ */
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token");
  return Boolean(token);
}

/* ===============================
   GET - Single blog
================================ */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;

    const blogs: Blog[] = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));

    const blog = blogs.find((b) => b.slug === slug);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    if (blog.status === "published") {
      blog.views = (blog.views ?? 0) + 1;
      fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));
    }

    return NextResponse.json({ success: true, blog });
  } catch (error: unknown) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching blog" },
      { status: 500 }
    );
  }
}

/* ===============================
   PUT - Update blog
================================ */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await context.params;
    const updateData: Partial<Blog> = await request.json();

    const blogs: Blog[] = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));

    const index = blogs.findIndex((b) => b.slug === slug);

    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    blogs[index] = {
      ...blogs[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully",
      blog: blogs[index],
    });
  } catch (error: unknown) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Error updating blog" },
      { status: 500 }
    );
  }
}

/* ===============================
   DELETE - Delete blog
================================ */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await context.params;

    const blogs: Blog[] = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));

    const filtered = blogs.filter((b) => b.slug !== slug);

    if (filtered.length === blogs.length) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(filtered, null, 2));

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting blog" },
      { status: 500 }
    );
  }
}
