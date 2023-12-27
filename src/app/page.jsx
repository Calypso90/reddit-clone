import { FaReddit } from "react-icons/fa";
import { fetchUser } from "@/lib/fetchUser.js";

export default async function Main() {
  const user = await fetchUser();
  return (
    <div id="welcomePage">
      <h1>Welcome to Reddit</h1>
      {!user.id && (
        <p>
          Please login. <FaReddit />
        </p>
      )}
      {user.id && <p id="username"> {user.username}</p>}
    </div>
  );
}
