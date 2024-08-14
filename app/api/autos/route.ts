import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const auto = await prisma.auto.findMany({
    include: {
      Recipient: true,
      Invite: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(auto, { status: 200 });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const auto = await prisma.auto.create({
    data: {
      model: data.model,
      brend: data.brend,
      seats: data.seats,
      class: data.class,
      price: data.price,
      inviteId: data.inviteId,
      Recipient: {
        create: data.Recipient.map((recipient: any) => ({
          ...recipient,
          inviteId: data.inviteId,
        })),
      },
    },
  });

  return NextResponse.json(auto, { status: 201 });
}
