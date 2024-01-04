import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { FaReddit } from "react-icons/fa";
import { FaRegCommentAlt } from "react-icons/fa";
import NewPost from "@/components/newPost.jsx";
import Link from "next/link.js";
import PostVotes from "@/components/votes.jsx";
import Post from "@/components/post.jsx";

export default async function SubPage({ params }) {
  const { subredditId } = params;

  const sub = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  const posts = await prisma.post.findMany({
    where: {
      subredditId: subredditId,
      parentId: null,
    },
    include: { user: true, children: true, votes: true, subreddit: true },
    orderBy: { createdAt: "desc" },
  });

  const user = await fetchUser();

  return (
    <div className="subPage">
      <div id="titleBox">
        <div className="subTitle">
          <FaReddit id="subIcon" /> r/{sub.name}
        </div>
      </div>
      <NewPost user={user} subredditId={subredditId} />
      <>
        {posts.map((post) => {
          return <Post post={post} />;
        })}
      </>
    </div>
  );
}
