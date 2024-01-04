import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import PostVotes from "@/components/votes.jsx";
import { NumofComments } from "@/lib/numOfComment.js";

export default async function Post({ post }) {
  const user = await fetchUser();

  const allComments = await NumofComments(post.id);

  return (
    <div className="r-postContainer" key={post.id}>
      <div className="postBox">
        <PostVotes post={post} votes={post.votes} user={user} />
        <Link
          className="r-post"
          href={`/subreddits/${post.subreddit.id}/${post.id}`}
        >
          <div className="postTitle">
            <p>{post.title}</p>
            <p className="titleReddit">
              <FaReddit /> r/{post.subreddit.name}
            </p>
          </div>
          <div className="postMessage">{post.message}</div>
          <div className="postComments">
            <p>{allComments}</p> <FaRegCommentAlt />
          </div>
        </Link>
      </div>
    </div>
  );
}
