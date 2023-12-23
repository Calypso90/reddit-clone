"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link.js";
import { IoIosCloseCircle } from "react-icons/io";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();
    if (info.error) {
      return setError(info.error);
    }
    router.push("/home");
    router.refresh();
  }

  return (
    <div id="login-container">
      <div id="exit-box">
        <Link href={"/"}>
          <IoIosCloseCircle id="exit-icon" />
        </Link>
      </div>
      <div id="login-box">
        <IoPersonSharp id="user-icon" />
        <p id="login-header">LOGIN</p>
        <form id="login-form" onSubmit={handleLogin}>
          <p>Username :</p>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <p>Password :</p>
          <input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className="form-button">LOGIN</button>
        </form>
        <br />
        <p>
          New to Reddit?{" "}
          <Link href={"/register"} className="form-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
