import { FaReddit } from "react-icons/fa";
import { prisma } from "@/lib/prisma.js";
import NewSubreddit from "@/components/newSubreddit.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";

export default async function Subreddits() {
  const subreddits = await prisma.subreddit.findMany({
    orderBy: { createdAt: "desc" },
  });

  const user = await fetchUser();

  return (
    <div id="reddits">
      <NewSubreddit user={user} />
      {subreddits.map((subreddit) => {
        return (
          <div key={subreddit.id} className="subreddit">
            <FaReddit />
            <Link className="chooseSub" href={`/subreddits/${subreddit.id}`}>
              r/{subreddit.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
