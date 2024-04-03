"use client";

import React from "react";
import ConnectWalletButton from "./ConnectWalletButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar bg-opacity-20 backdrop-blur-xl bg-white/10 rounded-md  px-4 py-2 w-[96%] lg:w-[98%] m-auto mt-4 z-[100]">
      <div className="flex-1">
        <Link href="/">
          <p className="text-3xl font-bold">raffleX</p>{" "}
        </Link>
      </div>
      <ConnectWalletButton />
    </div>
  );
};

export default Navbar;
