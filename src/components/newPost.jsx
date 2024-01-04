"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewPost({ user, subredditId }) {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  function handleClick() {
    if (user.id) {
      setIsCreating(true);
    }
  }

  function handleCancel() {
    setPostTitle("");
    setPostMessage("");
    setErrorMsg("");
    setIsCreating(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!postTitle || !postMessage) {
      setIsLoading(false);
      setErrorMsg("You must provide a title and text for your post.");
    } else {
      const response = await fetch(`/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: postTitle,
          message: postMessage,
          subredditId,
        }),
      });

      const info = await response.json();

      if (!info.success) {
        setErrorMsg(info.error);
        setIsLoading(false);
      } else {
        setPostTitle("");
        setPostMessage("");
        setErrorMsg("");
        setIsCreating(false);
        setIsLoading(false);
        router.refresh();
      }
    }
  }

  return (
    <>
      <button
        id="createPostButton"
        style={{ display: !isCreating ? "block" : "none" }}
        onClick={handleClick}
      >
        {" "}
        Create Post
      </button>
      {isLoading ? (
        <span class="loader"></span>
      ) : (
        <div id="newPost" style={{ display: isCreating ? "flex" : "none" }}>
          <form id="newPostForm" onSubmit={handleSubmit}>
            <input
              id="newPostTitle"
              type="text"
              placeholder="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            ></input>
            <textarea
              id="newPostText"
              placeholder="Text..."
              value={postMessage}
              onChange={(e) => setPostMessage(e.target.value)}
            ></textarea>
            <div id="buttonDiv">
              <button className="postButton" type="submit">
                Submit
              </button>
              <button
                className="postButton"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <p>{errorMsg}</p>
    </>
  );
}
