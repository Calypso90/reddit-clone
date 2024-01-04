import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import PostVotes from "@/components/votes.jsx";

export default async function Homepage() {
  const user = await fetchUser();

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
      parentId: null,
    },
    include: { subreddit: true, votes: true, children: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div id="homeFeed">
      {!user.id && <p>Please login to see your feed.</p>}
      {posts.map((post) => {
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
                  {post.children.length} <FaRegCommentAlt />
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
