import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  const auto = await prisma.auto.findUnique({
    where: {
      id: id as string,
    },
  });
  return NextResponse.json(auto, { status: 200 });
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { id, model, brend, seats, price, inviteId, Recipients } =
    await req.json();
  const auto = await prisma.auto.update({
    where: {
      id,
    },
    data: {
      model,
      brend,
      seats,

      price,
      inviteId,
      Recipient: {
        create: Recipients.map((recipient: any) => ({
          ...recipient,
          inviteId,
        })),
      },
    },
  });
  return NextResponse.json(auto, { status: 200 });
}
