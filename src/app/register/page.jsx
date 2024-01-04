"use client";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import { IoPersonSharp } from "react-icons/io5";
import Link from "next/link.js";
import { IoIosCloseCircle } from "react-icons/io";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const info = await response.json();
    if (info.error) {
      setIsLoading(false);
      return setError(info.error);
    }
    setIsLoading(false);
    router.push("/home");
    router.refresh();
  }

  return (
    <>
      {isLoading ? (
        <span class="loader"></span>
      ) : (
        <div id="register-container">
          <div id="exit-box">
            <Link href={"/"}>
              <IoIosCloseCircle id="exit-icon" />
            </Link>
          </div>
          <div id="register-box">
            <IoPersonSharp id="user-icon" />
            <p id="register-header">REGISTER</p>
            <form id="register-form" onSubmit={handleRegister}>
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
              <button className="form-button">REGISTER</button>
            </form>
            <p>{error}</p>
            <br />
            <p>
              Already a redditor?{" "}
              <Link href={"/login"} className="form-link">
                Log In
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
