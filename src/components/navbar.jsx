import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
import { IoMdHome } from "react-icons/io";
import { SearchBar } from "./searchbar.jsx";
import Logout from "./logout.jsx";

export async function Navbar() {
  const user = await fetchUser();

  return (
    <div id="navbar">
      <div id="reddit">
        <Link href={"/home"}>
          <img id="reddit-logo" src="/reddit-logo.png" />
        </Link>
        <p>reddit</p>
        <Link href={"/home"}>
          <IoMdHome id="home-logo" />
        </Link>
      </div>
      <div id="nav2">
        <SearchBar />
        <Link href={"/subreddits"}>SUBREDDITS</Link>
        {!user.id && <Link href={"/login"}> LOGIN</Link>}
        {user.id && <Logout />}
      </div>
    </div>
  );
}
