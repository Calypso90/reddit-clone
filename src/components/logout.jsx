"use client";
import Link from "next/link.js";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation.js";

export default function Logout() {
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch("/api/users/logout", {
      method: "POST",
    });
    const info = await response.json();
    // router.push("/");
    router.refresh();
  }

  return (
    <Link onClick={handleLogout} href={"/"} id="logoutBox">
      {" "}
      LOGOUT <IoIosLogOut id="logout-icon" />{" "}
    </Link>
  );
}
