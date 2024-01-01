import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  const { isUpvote, postId } = await request.json();

  const user = await fetchUser();

  const voteExists = await prisma.votes.findFirst({
    where: { postId, userId: user.id },
  });

  if (voteExists) {
    if (isUpvote === voteExists.isUpvote) {
      const vote = await prisma.votes.delete({
        where: {
          id: voteExists.id,
        },
      });
      return NextResponse.json({ success: true, vote });
    } else {
      const vote = await prisma.votes.update({
        where: { id: voteExists.id },
        data: {
          isUpvote: isUpvote,
        },
      });
      return NextResponse.json({ success: true, vote });
    }
  } else {
    const vote = await prisma.votes.create({
      data: {
        isUpvote: isUpvote,
        postId,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, vote });
  }
}
