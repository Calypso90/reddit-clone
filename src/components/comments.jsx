import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import DeleteComment from "@/components/deleteComment.jsx";
import EditComment from "@/components/editComment.jsx";
import PostVotes from "@/components/votes.jsx";
import CommentReply from "./commentReply.jsx";
import { FaReddit } from "react-icons/fa";

export default async function Comments({ subredditId, postId }) {
  const comment = await prisma.post.findFirst({
    where: { id: postId },
    include: { user: true, children: true, votes: true },
  });

  if (!comment) {
    return null;
  }

  const user = await fetchUser();

  return (
    <>
      <div className="commentContainer">
        <PostVotes post={comment} votes={comment.votes} user={user} />
        <div className="commentBox" key={comment.id}>
          <p id="commentUser">
            <FaReddit />
            {comment.user.username}
          </p>
          <div className="postMessage">{comment.message}</div>
          <div className="commentOptions">
            {user.id === comment.user.id && <EditComment post={comment} />}
            {user.id === comment.user.id && <DeleteComment post={comment} />}
            <CommentReply
              post={comment}
              subredditId={subredditId}
              user={user}
            />
          </div>
          {comment.children &&
            comment.children.map((comment) => (
              <Comments postId={comment.id} subredditId={subredditId} />
            ))}
        </div>
      </div>
    </>
  );
}
