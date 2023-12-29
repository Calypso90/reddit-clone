import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import { FaReddit } from "react-icons/fa";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";
import NewPost from "@/components/newPost.jsx";
import Link from "next/link.js";

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
      <>
        {posts.map((post) => {
          return (
            <div className="r-postContainer" key={post.id}>
              <div className="r-PostVotes">
                <button className="upvote">
                  <BsFillArrowUpSquareFill />
                </button>
                <p>0</p>
                <button className="downvote">
                  <BsFillArrowDownSquareFill />
                </button>
              </div>
              <Link
                className="r-post"
                href={`/subreddits/${post.subredditId}/${post.id}`}
              >
                <div className="postTitleBox">
                  <div className="postTitle">
                    {post.title}{" "}
                    <p className="titleReddit">
                      <FaReddit /> Posted by u/{post.user.username}
                    </p>
                  </div>
                </div>
                <div className="postMessage">{post.message}</div>
                <div className="postComments">
                  <FaRegCommentAlt />
                </div>
              </Link>
            </div>
          );
        })}
      </>
    </div>
  );
}
