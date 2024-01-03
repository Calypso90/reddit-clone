import NewComments from "@/components/newComment.jsx";
import DeleteComment from "@/components/deleteComment.jsx";
import EditComment from "@/components/editComment.jsx";
import PostVotes from "@/components/votes.jsx";

export default async function Replies({ comments, subredditId }) {
  // const comments = await prisma.post.findMany({
  //   where: { parentId: postId },
  //   include: { user: true, children: true, votes: true, subreddit: true },
  //   orderBy: { createdAt: "desc" },
  // });

  return (
    <>
      {comments.map((post) => {
        return (
          <>
            <div className="commentContainer">
              {/* <PostVotes post={post} votes={post.votes} /> */}
              <div className="commentBox" key={post.id}>
                <div className="postMessage">{post.message}</div>
                <div className="postComments">
                  <EditComment post={post} />
                  <DeleteComment post={post} />
                  <NewComments post={post} subredditId={subredditId} />
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}
