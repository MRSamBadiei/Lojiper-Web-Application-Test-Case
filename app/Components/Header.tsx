"use client";
import { signOut } from "next-auth/react";

const Header: React.FC<{ fullName: string }> = ({ fullName }) => {
  return (
    <div>
      <header className="p-5">
        <div className="container mx-auto flex justify-between items-center text-white">
          <div className="uppercase font-bold text-2xl">sb travel</div>
          <div className="flex items-center">
            <p className="mr-5">
              {fullName !== "" ? "Welcome" + fullName : ""}
            </p>
            <button className="border rounded-md p-2" onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
