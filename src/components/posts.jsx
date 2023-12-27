"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaReddit } from "react-icons/fa";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Delete from "./deletePost.jsx";
import EditPost from "./editPost.jsx";

export default function Posts({ posts }) {
  //   const [postTitle, setPostTitle] = useState("");
  //   const [postMessage, setPostMessage] = useState("");
  //   const [isCreating, setIsCreating] = useState(false);
  //   const [errorMsg, setErrorMsg] = useState("");

  //   const router = useRouter();

  return (
    <>
      {posts.map((post) => {
        return (
          <div className="r-postContainer" key={post.id}>
            <div className="r-PostVotes">
              <button className="upvote">
                <BsFillArrowUpSquareFill />
              </button>
              <p>0</p>
              <button className="downvote">
                <BsFillArrowDownSquareFill />
              </button>
            </div>
            <div className="r-post">
              <div className="postTitleBox">
                <div className="postTitle">
                  {post.title}{" "}
                  <p className="titleReddit">
                    <FaReddit /> Posted by u/{post.user.username}
                  </p>
                </div>
                <div className="postChange">
                  <EditPost post={post} />
                  <Delete post={post} />
                </div>
              </div>
              <div className="postMessage">{post.message}</div>
              <div className="postComments">
                Comments <FaRegCommentAlt />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
