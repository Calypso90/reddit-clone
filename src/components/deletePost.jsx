"use client";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function DeletePost({ post, subId }) {
  const router = useRouter();

  async function handleDelete() {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
      cache: "no-store",
    });
    const info = await response.json();
    router.push(`/subreddits/${subId}`);
    router.refresh();
  }

  return (
    <>
      <button id="deleteButton" onClick={handleDelete}>
        <MdDeleteOutline />
      </button>
    </>
  );
}
