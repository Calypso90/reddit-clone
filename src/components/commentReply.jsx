"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";

export default function CommentReply({ post, subredditId, user }) {
  const [comment, setComment] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  function handleClick() {
    if (user.id) {
      setIsReplying(true);
    }
  }

  function handleCancel() {
    setComment("");
    setErrorMsg("");
    setIsReplying(false);
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
        setIsReplying(false);
        setErrorMsg("");
        router.refresh();
      }
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        id="reply"
        style={{ display: !isReplying ? "flex" : "none" }}
      >
        <FaRegCommentAlt />
      </button>
      <div>
        <form
          id="newCommentForm"
          onSubmit={handleSubmit}
          style={{ display: isReplying ? "flex" : "none" }}
        >
          <textarea
            placeholder="Text..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div id="buttonDiv">
            <button className="commentButton" type="submit">
              Submit
            </button>
            <button
              className="commentButton"
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
          <p>{errorMsg}</p>
        </form>
      </div>
    </>
  );
}
