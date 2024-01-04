import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import PostVotes from "@/components/votes.jsx";
import { NumofComments } from "@/lib/numOfComment.js";
import Post from "@/components/post.jsx";

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
      {user.id && posts.length === 0 && (
        <p>
          Visit a <Link href={`/subreddits/`}>subreddit</Link> and create a new
          post!
        </p>
      )}
      {posts.map((post) => {
        return <Post post={post} />;
      })}
    </div>
  );
}
