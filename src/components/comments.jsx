import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import DeleteComment from "@/components/deleteComment.jsx";
import EditComment from "@/components/editComment.jsx";
import PostVotes from "@/components/votes.jsx";
import CommentReply from "./commentReply.jsx";

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
        <PostVotes post={comment} votes={comment.votes} />
        <div className="commentBox" key={comment.id}>
          <div className="postMessage">{comment.message}</div>
          <div className="commentOptions">
            <EditComment post={comment} />
            <DeleteComment post={comment} />
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
