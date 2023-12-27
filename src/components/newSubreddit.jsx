"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewSubreddit({ user }) {
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [newSub, setNewSub] = useState("");

  const router = useRouter();

  function handleClick() {
    if (user.id) {
      setIsCreating(true);
    }
  }

  function handleCancel() {
    setNewSub("");
    setErrorMsg("");
    setIsCreating(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`/api/subreddits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newSub,
      }),
    });

    const info = await response.json();

    if (!info.success) {
      setErrorMsg(info.error);
    } else {
      setNewSub("");
      setErrorMsg("");
      setIsCreating(false);
      router.refresh();
    }
  }

  return (
    <>
      <div style={{ display: !isCreating ? "block" : "none" }}>
        <button id="createSub" onClick={handleClick}>
          Create a Community
        </button>
      </div>
      <p style={{ display: !user.id ? "block" : "none" }}>
        Please login to create a new subreddit.
      </p>
      <div style={{ display: isCreating ? "block" : "none" }}>
        <form id="subForm" onSubmit={handleSubmit}>
          <input
            id="newSubreddit"
            type="text"
            placeholder="Enter new subreddit"
            value={newSub}
            onChange={(e) => setNewSub(e.target.value)}
          ></input>
          <button className="subButton" type="submit">
            Submit
          </button>
          <button className="subButton" type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
        <p>{errorMsg}</p>
      </div>
    </>
  );
}
