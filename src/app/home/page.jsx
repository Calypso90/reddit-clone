import { FaReddit } from "react-icons/fa";
import { CiImageOn } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

export default function Homepage() {
  return (
    <div id="homeFeed">
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
        <div id="r-post">This is a post I created</div>
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
        <div id="r-post">This is another post I created</div>
      </div>
    </div>
  );
}
