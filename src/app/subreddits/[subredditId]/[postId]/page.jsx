import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { FaReddit } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import DeletePost from "@/components/deletePost.jsx";
import EditPost from "@/components/editPost.jsx";
import NewComment from "@/components/newComment.jsx";
import PostVotes from "@/components/votes.jsx";
import Link from "next/link.js";
import Comments from "@/components/comments.jsx";

export default async function PostPage({ params }) {
  const { subredditId, postId } = params;

  const user = await fetchUser();

  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: { user: true, children: true, subreddit: true },
  });

  const sub = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const comments = await prisma.post.findMany({
    where: { parentId: postId },
    include: { user: true, children: true, votes: true, subreddit: true },
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
        <NewComment post={post} subredditId={subredditId} />
        <Comments comments={comments} subredditId={subredditId} />
      </div>
    </div>
  );
}
