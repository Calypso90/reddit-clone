"use client";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostVotes({ post, votes, user }) {
  const router = useRouter();

  let count = 0;

  for (let i = 0; i < votes.length; i++) {
    if (votes[i].isUpvote === true) {
      count += 1;
    } else {
      count -= 1;
    }
  }

  async function handleUpvote() {
    if (user.id) {
      const response = await fetch(`/api/votes`, {
        method: "POST",
        body: JSON.stringify({
          isUpvote: true,
          postId: post.id,
        }),
      });
      router.refresh();
    }
  }

  async function handleDownvote() {
    if (user.id) {
      const response = await fetch(`/api/votes`, {
        method: "POST",
        body: JSON.stringify({
          isUpvote: false,
          postId: post.id,
        }),
      });
      router.refresh();
    }
  }

  return (
    <div className="r-PostVotes">
      <button className="upvote" disabled={!user.id} onClick={handleUpvote}>
        <BsFillArrowUpSquareFill />
      </button>
      <p>{count}</p>
      <button className="downvote" disabled={!user.id} onClick={handleDownvote}>
        <BsFillArrowDownSquareFill />
      </button>
    </div>
  );
}
