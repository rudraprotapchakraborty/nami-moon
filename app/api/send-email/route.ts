// app/api/send-email/route.ts
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

    const mailOptions = {
      from: `"${name}" <${process.env.ZOHO_EMAIL!}>`, // ✅ must be your verified Zoho email
      to: "contact@siriusamarketing.com",              // ✅ recipient (you)
      replyTo: email,                                  // ✅ user’s real email for replies
      subject: subject || "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: "Email sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
