import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function PUT(request, response) {
  const { postId } = response.params;
  const { title, message } = await request.json();

  const post = await prisma.post.update({
    where: { id: postId },
    data: {
      title: title,
      message: message,
    },
  });

  return NextResponse.json({ success: true, post });
}

export async function DELETE(request, response) {
  const { postId } = response.params;

  const post = await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  return NextResponse.json({ success: true, post });
}
