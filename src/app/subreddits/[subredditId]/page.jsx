import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { FaReddit } from "react-icons/fa";
import NewPost from "@/components/newPost.jsx";
import Posts from "@/components/posts.jsx";

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
    include: { user: true },
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
      <Posts posts={posts} />
    </div>
  );
}
