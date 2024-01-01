import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { FaReddit } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import DeletePost from "@/components/deletePost.jsx";
import EditPost from "@/components/editPost.jsx";
import NewComments from "@/components/newComment.jsx";
import DeleteComment from "@/components/deleteComment.jsx";
import EditComment from "@/components/editComment.jsx";
import PostVotes from "@/components/votes.jsx";
import Link from "next/link.js";

export default async function PostPage({ params }) {
  const { subredditId, postId } = params;

  const user = await fetchUser();

  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: { user: true, children: true },
  });

  const sub = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const comments = await prisma.post.findMany({
    where: { parentId: postId },
    orderBy: { createdAt: "desc" },
  });

  const votes = await prisma.votes.findMany({
    where: { postId: postId },
  });

  return (
    <div className="postPage">
      <div id="titleBox">
        <Link className="subTitle" href={`/subreddits/${subredditId}`}>
          <FaReddit id="subIcon" /> r/{sub.name}
        </Link>
      </div>
      <div className="postContainer">
        <PostVotes post={post} votes={votes} />
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
              <DeletePost post={post} subId={subredditId} />
            </div>
          </div>
          <div className="postMessage">{post.message}</div>
          <div className="postComments">
            <p>{post.children.length}</p>
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
                <EditComment post={post} />
                <DeleteComment post={post} />
                <FaRegCommentAlt /> Reply
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
