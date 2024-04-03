"use client";
import React from "react";
import {useAccount, useReadContract, useWriteContract} from "wagmi";
import {raffleFactoryABI, raffleFactoryAddress} from "../lib/contants";
import RaffleCard from "../components/RaffleCard";
import CardSkeleten from "../components/CardSkeleten";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RafflesComponent = () => {
  const [raffles, setRaffles] = React.useState<any[]>([]);
  const {address, isConnected} = useAccount();
  const [showOpenRaffles, setShowOpenRaffles] = React.useState<boolean>(true);
  const {data: userRaffles, isLoading} = useReadContract({
    abi: raffleFactoryABI,
    address: raffleFactoryAddress,
    functionName: "getDeployedRaffle",
    args: [address],
  });

  React.useEffect(() => {
    if (userRaffles) {
      setRaffles(userRaffles as any[]);
    }
  }, [userRaffles]);

  return (
    <>
      {isConnected ? (
        <div className="p-4">
          <ToastContainer position="top-right" />
          <p className="text-3xl font-bold p-4 flex flex-row gap-2">
            Raffles Tickets
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 mx-auto">
            {raffles &&
              raffles?.length > 0 &&
              raffles.map((raffle: any, index: number) => {
                return <RaffleCard key={index} address={raffle} />;
              })}
          </div>
          {isLoading && <CardSkeleten />}
          <p className="text-3xl font-bold p-4 flex flex-row gap-2">
            Managing Raffles
            <div
              role="tablist"
              className="w-40 tabs tabs-boxed border-white/50 rounded-xl border-[1px]"
            >
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
                    open={showOpenRaffles}
                    owner={true}
                  />
                );
              })}
          </div>
          {isLoading && <CardSkeleten />}
        </div>
      ) : (
        <div role="alert" className="alert alert-warning w-[98%] my-4 m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Please Connect your wallet to see your raffles.</span>
        </div>
      )}
    </>
  );
};

export default RafflesComponent;
