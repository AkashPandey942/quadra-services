import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOGS_FILE = path.join(process.cwd(), "data", "blogs.json");

/* ===============================
   TYPES
================================ */
interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  views: number;
  [key: string]: unknown; // allow safe extra fields
}

/* ===============================
   AUTH CHECK
================================ */
function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get("admin_token");
  return Boolean(token);
}

/* ===============================
   GET - Fetch all blogs
================================ */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status"); // 'published' | 'draft' | null
    const category = searchParams.get("category");

    let blogs: Blog[] = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));

    // Filter by status
    if (status) {
      blogs = blogs.filter((blog: Blog) => blog.status === status);
    } else {
      // Public access → only published
      const isAdmin = isAuthenticated(request);
      if (!isAdmin) {
        blogs = blogs.filter((blog: Blog) => blog.status === "published");
      }
    }

    // Filter by category
    if (category) {
      blogs = blogs.filter((blog: Blog) => blog.category === category);
    }

    // Sort by created date (newest first)
    blogs.sort(
      (a: Blog, b: Blog) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, blogs });
  } catch (error: unknown) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching blogs" },
      { status: 500 }
    );
  }
}

/* ===============================
   POST - Create new blog (admin only)
================================ */
export async function POST(request: NextRequest) {
  try {
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const blogData: Partial<Blog> = await request.json();

    const blogs: Blog[] = JSON.parse(fs.readFileSync(BLOGS_FILE, "utf-8"));

    // Generate slug from title
    const slug = blogData
      .title!.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Check duplicate slug
    if (blogs.some((blog: Blog) => blog.slug === slug)) {
      return NextResponse.json(
        { success: false, message: "Blog with this title already exists" },
        { status: 400 }
      );
    }

    const newBlog: Blog = {
      id: slug,
      slug,
      title: blogData.title!,
      excerpt: blogData.excerpt ?? "",
      content: blogData.content ?? "",
      author: blogData.author ?? "Admin",
      category: blogData.category ?? "Uncategorized",
      tags: blogData.tags ?? [],
      featuredImage: blogData.featuredImage ?? "",
      status: (blogData.status as "draft" | "published") ?? "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    };

    blogs.push(newBlog);

    fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2));

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error: unknown) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Error creating blog" },
      { status: 500 }
    );
  }
}
