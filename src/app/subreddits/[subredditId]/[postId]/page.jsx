import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { FaReddit } from "react-icons/fa";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import Delete from "@/components/deletePost.jsx";
import EditPost from "@/components/editPost.jsx";
import NewComments from "@/components/newComment.jsx";

export default async function PostPage({ params }) {
  const { subredditId, postId } = params;

  const user = await fetchUser();

  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: { user: true },
  });

  const sub = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const comments = await prisma.post.findMany({
    where: { parentId: postId },
  });

  return (
    <div className="postPage">
      <div id="titleBox">
        <div className="subTitle">
          <FaReddit id="subIcon" /> r/{sub.name}
        </div>
      </div>
      <div className="r-postContainer">
        <div className="postContainer">
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
              <FaRegCommentAlt />
            </div>
          </div>
        </div>
        <div id="comments">
          <NewComments post={post} subredditId={subredditId} />
          {comments.map((post) => {
            return (
              <div className="commentBox" key={post.id}>
                <div className="postMessage">{post.message}</div>
                <div className="postComments">
                  <FaRegCommentAlt /> Reply
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
