import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_EMAIL!,
        pass: process.env.ZOHO_PASSWORD!,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.ZOHO_EMAIL!}>`,
      to: "contact@siriusamarketing.com",
      replyTo: email,
      subject: subject || "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error sending email:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
