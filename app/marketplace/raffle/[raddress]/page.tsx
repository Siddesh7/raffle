"use client";
import React, {useEffect, useState} from "react";
import {useAccount, useReadContract, useWriteContract} from "wagmi";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {raffleABI} from "@/app/lib/contants";
import CardSkeleten from "@/app/components/CardSkeleten";
import RaffleCard from "@/app/components/RaffleCar";

interface RaffleCardProps {
  params: {
    raddress: `0x${string}`;
  };
}
const RaffleComponent: React.FC<RaffleCardProps> = ({params}) => {
  return (
    <div className="p-4 mt-8">
      <ToastContainer position="top-right" />
      <RaffleCard
        address={params.raddress}
        showUserFeatures={true}
        showStatus={true}
      />
    </div>
  );
};

export default RaffleComponent;
