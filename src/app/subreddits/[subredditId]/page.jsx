import { prisma } from "@/lib/prisma.js";
import { FaReddit } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

export default async function SubPage({ params }) {
  const { subredditId } = params;

  const sub = await prisma.subreddit.findFirst({
    where: { id: subredditId },
  });

  return (
    <div className="subPage">
      <div id="titleBox">
        <div className="subTitle">
          <FaReddit id="subIcon" /> r/{sub.name}
        </div>
      </div>
      <div id="createPost">
        <FaReddit />
        <button id="createPostButton"> Create Post</button>
        <div id="create1">
          <CiImageOn />
          <IoIosLink />
        </div>
      </div>
      <div id="r-postContainer">
        <div id="r-PostVotes">
          <button className="upvote">
            <BsFillArrowUpSquareFill />
          </button>
          <span>9</span>
          <button className="downvote">
            <BsFillArrowDownSquareFill />
          </button>
        </div>
        <div id="r-post">This is a post</div>
      </div>
      <div id="r-postContainer">
        <div id="r-PostVotes">
          <button className="upvote">
            <BsFillArrowUpSquareFill />
          </button>
          <span>7</span>
          <button className="downvote">
            <BsFillArrowDownSquareFill />
          </button>
        </div>
        <div id="r-post">This is another post</div>
      </div>
    </div>
  );
}
