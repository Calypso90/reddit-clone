"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaReddit } from "react-icons/fa";

export default function NewPost({ user, subredditId }) {
  const [postTitle, setPostTitle] = useState("");
  const [postMessage, setPostMessage] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

    if (!postTitle || !postMessage) {
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
      } else {
        setPostTitle("");
        setPostMessage("");
        setErrorMsg("");
        setIsCreating(false);
        router.refresh();
      }
    }
  }

  return (
    <>
      <div id="createPost" style={{ display: !isCreating ? "flex" : "none" }}>
        <FaReddit />
        <button id="createPostButton" onClick={handleClick}>
          {" "}
          Create Post
        </button>
        <div id="create1"></div>
      </div>
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
            {/* <CiImageOn />
            <IoIosLink /> */}
            <button className="postButton" type="submit">
              Submit
            </button>
            <button className="postButton" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
      <p>{errorMsg}</p>
    </>
  );
}
