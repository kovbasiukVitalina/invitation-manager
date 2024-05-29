import { prisma } from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  const invite = await prisma.invite.findUnique({
    where: {
      id: id as string,
    },
  });
  return NextResponse.json(invite, { status: 200 });
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { id, title, description, eventDate, location, recipients } =
    await req.json();
  const invite = await prisma.invite.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      eventDate,
      location,
    },
  });
  return NextResponse.json(invite, { status: 200 });
}

export async function DELETE(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.body;

  try {
    const invite = await prisma.invite.delete({
      where: {
        id: id,
      },
    });

    return res.status(200).json(invite);
  } catch (error) {
    console.error("Error deleting invite:", error);
    return res.status(500).json({ error: "Failed to delete invite" });
  }
}
