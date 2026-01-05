import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Nodemailer works ONLY in Node.js runtime
 */
export const runtime = "nodejs";

interface ContactPayload {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;
    const { name, email, mobile, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Missing email environment variables");
      return NextResponse.json(
        { success: false, message: "Email service not configured" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, // App Password only
      },
    });

    /* ===============================
       ADMIN EMAIL
    ================================ */
    await transporter.sendMail({
      from: `"Apex Nexon" <${process.env.EMAIL_USER}>`,
      to: "ipandeyakash@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E91E63;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mobile:</strong> ${mobile ?? "N/A"}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #fff; padding: 15px; border-radius: 4px;">
              ${message}
            </p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Sent from Apex Nexon contact form
          </p>
        </div>
      `,
    });

    /* ===============================
       USER CONFIRMATION EMAIL
    ================================ */
    await transporter.sendMail({
      from: `"Apex Nexon" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Apex Nexon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #E91E63;">Thank You for Reaching Out!</h2>
          <p>Dear ${name},</p>
          <p>
            We have received your message and our team will contact you shortly.
          </p>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message</h3>
            <p style="background: #fff; padding: 15px; border-radius: 4px;">
              ${message}
            </p>
          </div>

          <p>
            Best regards,<br />
            <strong>Apex Nexon Team</strong>
          </p>

          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />

          <p style="color: #666; font-size: 12px;">
            If you did not submit this form, please ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error: unknown) {
    console.error("Email error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

