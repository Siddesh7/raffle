"use client";
import React from "react";
import {useAccount, useReadContract, useWriteContract} from "wagmi";
import {raffleFactoryABI, raffleFactoryAddress} from "../lib/contants";
import RaffleCard from "../components/RaffleCard";

const RafflesComponent = () => {
  const [raffles, setRaffles] = React.useState<any[]>([]);
  const {address} = useAccount();
  const {data} = useReadContract({
    abi: raffleFactoryABI,
    address: raffleFactoryAddress,
    functionName: "getDeployedRaffle",
    args: [address],
  });

  React.useEffect(() => {
    if (data) {
      console.log(data);
      setRaffles(data as any[]);
    }
  }, [data]);

  return (
    <div className="p-4">
      <p className="text-3xl text-bold">Raffles Open</p>
      <div className="flex flex-row gap-2 p-4">
        {raffles &&
          raffles?.length > 0 &&
          raffles?.map((raffle: any, index: number) => {
            return (
              <div key={index}>
                <RaffleCard address={raffle} owner={true} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RafflesComponent;
