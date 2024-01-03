import NewComments from "@/components/newComment.jsx";
import DeleteComment from "@/components/deleteComment.jsx";
import EditComment from "@/components/editComment.jsx";
import PostVotes from "@/components/votes.jsx";
import Replies from "./replies.jsx";

export default async function Comments({ comments, subredditId }) {
  return (
    <>
      {comments.map((post) => {
        return (
          <>
            <div className="commentContainer">
              <PostVotes post={post} votes={post.votes} />
              <div className="commentBox" key={post.id}>
                <div className="postMessage">{post.message}</div>
                <div className="postComments">
                  <EditComment post={post} />
                  <DeleteComment post={post} />
                  <NewComments post={post} subredditId={subredditId} />
                </div>
              </div>
            </div>
            <Replies comments={post.children} subredditId={subredditId} />
          </>
        );
      })}
    </>
  );
}
