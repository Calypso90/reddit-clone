import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(request, response) {
  const { votesId, isUpvote, postId } = response.params;

  const user = await fetchUser();

  const voteExists = await prisma.votes.findFirst({ where: { votesId } });

  if (!voteExists) {
    const vote = await prisma.votes.create({
      data: {
        votesId,
        isUpvote,
        postId,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, vote });
  }
}
