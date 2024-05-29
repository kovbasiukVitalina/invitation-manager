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

export async function DELETE(req: Request, { params }: any) {
  const { id } = params;

  try {
    // Find the invite to check if it exists and get its associated recipients
    const invite = await prisma.invite.findUnique({
      where: {
        id: id as string,
      },
      include: {
        recipients: true,
      },
    });

    if (!invite) {
      return NextResponse.json({ error: "Invite not found" }, { status: 404 });
    }

    // Delete associated recipients
    await prisma.recipient.deleteMany({
      where: {
        inviteId: id as string,
      },
    });

    // Delete the invite
    await prisma.invite.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json(
      { message: "Invite and associated recipients deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting invite:", error);
    return NextResponse.json(
      { error: "Failed to delete invite and associated recipients" },
      { status: 500 }
    );
  }
}
