import { prisma } from "@/lib/prisma.js";
import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import { FaReddit } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { FaRegCommentAlt } from "react-icons/fa";

export default async function Homepage() {
  const user = await fetchUser();

  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
      parentId: null,
    },
    include: { subreddit: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div id="homeFeed">
      {!user.id && <p>Please login to see your feed.</p>}
      <div id="createPost">
        <FaReddit />
        <button id="createPostButton"> Create Post</button>
        <div id="create1">
          <CiImageOn />
          <IoIosLink />
        </div>
      </div>
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
            <div className="r-post">
              <div className="postTitle">
                <p>{post.title}</p>
                <p className="titleReddit">
                  <FaReddit />{" "}
                  <Link
                    className="titleReddit"
                    href={`/subreddits/${post.subreddit.id}`}
                  >
                    r/{post.subreddit.name}
                  </Link>
                </p>
              </div>
              <div className="postMessage">{post.message}</div>
              <div className="postComments">
                Comments <FaRegCommentAlt />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
