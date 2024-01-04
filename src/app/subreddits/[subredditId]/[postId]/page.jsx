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
        <PostVotes post={post} votes={votes} user={user} />
        <div className="r-post">
          <div className="postTitleBox">
            <div className="postTitle">
              {post.title}{" "}
              <p className="titleReddit">
                <FaReddit /> Posted by u/{post.user.username}
              </p>
            </div>
            <div className="postChange">
              {user.id === post.user.id && <EditPost post={post} />}
              {user.id === post.user.id && (
                <DeletePost post={post} subId={subredditId} />
              )}
            </div>
          </div>
          <div className="postMessage">{post.message}</div>
          <div className="postComments">
            <p>{post.children.length}</p>
            <FaRegCommentAlt />
          </div>
        </div>
      </div>
      <NewComment post={post} subredditId={subredditId} user={user} />
      <div id="comments">
        {post.children &&
          post.children.map((comment) => (
            <Comments
              key={comment.id}
              postId={comment.id}
              subredditId={subredditId}
            />
          ))}
      </div>
    </div>
  );
}
