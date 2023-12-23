import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  try {
    const { name, userId } = await request.json();

    const user = await fetchUser();

    if (!name) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name for your new subreddit.",
      });
    }

    const subExists = await prisma.subreddit.findFirst({ where: { name } });

    if (subExists) {
      return NextResponse.json({
        success: false,
        error: "Subreddit already exists.",
      });
    }

    const subreddit = await prisma.subreddit.create({
      data: {
        name,
        userId: user.id,
      },
    });
    return NextResponse.json({ success: true, subreddit });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
