import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const invites = await prisma.invite.findMany({
    include: {
      recipients: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(invites, { status: 200 });
}

export async function POST(req: NextRequest) {
  const { title, description, eventDate, location, recipients } =
    await req.json();

  const invite = await prisma.invite.create({
    data: {
      title,
      description,
      eventDate,
      location,
      recipients: {
        create: recipients,
      },
    },
  });

  //   await sendEmail(invite);

  return NextResponse.json(invite, { status: 201 });
}

async function sendEmail(invite: any) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NEXT_PUBLIC_MY_EMAIL,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.NEXT_PUBLIC_MY_EMAIL,
    to: invite.email,
    subject: invite.title,
    html: `
    <div>
      <h1>${invite.title}</h1>
      <p>${invite.description}</p>
      <p>${invite.eventDate}</p>
      <p>${invite.location}</p>
    </div>
    `,
  };
  await transporter.sendMail(mailOptions);
}
