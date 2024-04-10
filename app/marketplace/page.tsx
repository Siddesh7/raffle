"use client";
import React from "react";
import {useAccount, useReadContract, useWriteContract} from "wagmi";
import {raffleFactoryABI, raffleFactoryAddress} from "../lib/contants";
import RaffleCard from "../components/RaffleCar";
import CardSkeleten from "../components/CardSkeleten";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RafflesComponent = () => {
  const [raffles, setRaffles] = React.useState<any[]>([]);
  const [showOpenRaffles, setShowOpenRaffles] = React.useState<boolean>(true);
  const {data: allRaffles, isLoading} = useReadContract({
    abi: raffleFactoryABI,
    address: raffleFactoryAddress,
    functionName: "getAllDeployedRaffles",
  });

  React.useEffect(() => {
    if (allRaffles) {
      setRaffles(allRaffles as any[]);
    }
  }, [allRaffles]);

  return (
    <div className="p-4">
      <ToastContainer position="top-right" />
      <p className="text-3xl font-bold p-4 flex flex-row gap-2">
        Raffles
        <div role="tablist" className="w-24 tabs tabs-boxed">
          <a
            role="tab"
            className={`tab ${showOpenRaffles && "tab-active"}`}
            onClick={() => {
              setShowOpenRaffles(true);
            }}
          >
            open
          </a>
          <a
            role="tab"
            className={`tab ${!showOpenRaffles && "tab-active"}`}
            onClick={() => {
              setShowOpenRaffles(false);
            }}
          >
            closed
          </a>
        </div>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 mx-auto">
        {raffles &&
          raffles?.length > 0 &&
          raffles.map((raffle: any, index: number) => {
            return (
              <RaffleCard
                key={index}
                address={raffle}
                showUserFeatures={true}
                showStatus={true}
                open={showOpenRaffles}
              />
            );
          })}
      </div>
      {isLoading && <CardSkeleten />}
    </div>
  );
};

export default RafflesComponent;
