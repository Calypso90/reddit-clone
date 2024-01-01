"use client";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function PostVotes({ post, votes }) {
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
    const response = await fetch(`/api/votes`, {
      method: "POST",
      body: JSON.stringify({
        isUpvote: true,
        postId: post.id,
      }),
    });
    router.refresh();
  }

  async function handleDownvote() {
    const response = await fetch(`/api/votes`, {
      method: "POST",
      body: JSON.stringify({
        isUpvote: false,
        postId: post.id,
      }),
    });
    router.refresh();
  }

  return (
    <div className="r-PostVotes">
      <button className="upvote" onClick={handleUpvote}>
        <BsFillArrowUpSquareFill />
      </button>
      <p>{count}</p>
      <button className="downvote" onClick={handleDownvote}>
        <BsFillArrowDownSquareFill />
      </button>
    </div>
  );
}
