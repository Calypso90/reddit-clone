"use client";
import { CiEdit } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EditPost({ post }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedMsg, setUpdatedMsg] = useState(post.message);

  const router = useRouter();

  function handleClick() {
    setIsEditing(true);
  }

  function handleCancel() {
    setUpdatedTitle(updatedTitle);
    setUpdatedMsg(post.message);
    setIsEditing(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updatedTitle,
        message: updatedMsg,
      }),
    });
    setIsEditing(false);
    router.refresh();
  }
  return (
    <>
      <button
        id="editButton"
        style={{ visibility: !isEditing ? "visible" : "collapse" }}
        onClick={handleClick}
      >
        <CiEdit />
      </button>
      <div style={{ display: isEditing ? "block" : "none" }}>
        <form id="newPostForm" onSubmit={handleSubmit}>
          <textarea
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          >
            {updatedTitle}
          </textarea>
          <textarea
            value={updatedMsg}
            onChange={(e) => setUpdatedMsg(e.target.value)}
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
        </form>
      </div>
    </>
  );
}
