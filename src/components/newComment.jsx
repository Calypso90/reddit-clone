"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewComment({ post, subredditId }) {
  const [comment, setComment] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  function handleCancel() {
    setComment("");
    setErrorMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!comment) {
      setErrorMsg("You must provide text for your reply.");
    } else {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: comment,
          subredditId,
          parentId: post.id,
        }),
      });

      const info = await response.json();

      if (!info.success) {
        setErrorMsg(info.error);
      } else {
        setComment("");
        setErrorMsg("");
        router.refresh();
      }
    }
  }

  return (
    <form id="newCommentForm" onSubmit={handleSubmit}>
      <textarea
        id="newPostText"
        placeholder="Text..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <div id="buttonDiv">
        <button className="postButton" type="submit">
          Submit
        </button>
        <button className="postButton" type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
      <p>{errorMsg}</p>
    </form>
  );
}
