import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  const { title, message, subredditId, parentId } = await request.json();

  const user = await fetchUser();

  if (title) {
    const postExists = await prisma.post.findFirst({ where: { title } });

    if (!postExists) {
      const post = await prisma.post.create({
        data: {
          title,
          message,
          subredditId,
          parentId,
          userId: user.id,
        },
      });
      return NextResponse.json({ success: true, post });
    }
  } else {
    const post = await prisma.post.create({
      data: {
        message,
        subredditId,
        parentId,
        userId: user.id,
      },
    });
    return NextResponse.json({ success: true, post });
  }
}
