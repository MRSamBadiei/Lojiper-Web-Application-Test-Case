"use client";
import { signIn } from "next-auth/react";

export default function Navbar() {
  return (
    <header className="navbar fixed top-0 h-16 left-0 bg-base-100 container">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">Travel</a>
      </div>

      <div className="navbar-end">
        <button onClick={() => signIn()} className="btn">
          Sign in
        </button>
      </div>
    </header>
  );
}
