"use client";
import React, {useEffect} from "react";
import {getTokenName, raffleABI} from "../lib/contants";
import {useAccount, useReadContract} from "wagmi";
import ApproveButton from "./ApproveButton";

import BuyButton from "./BuyButton";
import PickWinnerButton from "./PickWinnerButton";
import CancelRaffleButton from "./CancelRaffleButton";
import ClaimCancelledRaffleButton from "./ClaimCancelledRaffleButton";
import {FaLink} from "react-icons/fa";

const RaffleCard = ({
  address,
  owner,
  open,
}: {
  address: `0x${string}`;
  owner?: boolean;
  open?: boolean;
}) => {
  const [raffle, setRaffle] = React.useState<any[]>([
    "",
    "",
    "",
    "",
    "",
    true,
    0,
    0,
    true,
    false,
    "",
  ]);
  const [nft, setNFT] = React.useState<any>({});
  const {address: userAddress} = useAccount();
  const {data: raffleInfo} = useReadContract({
    abi: raffleABI,
    address: address,
    functionName: "getRaffleInfo",
  });

  const {data: userBalance} = useReadContract({
    abi: raffleABI,
    address: address,
    functionName: "balanceOf",
    args: [userAddress],
  });

  React.useEffect(() => {
    if (raffleInfo) {
      console.log(raffleInfo);
      setRaffle(raffleInfo as any[]);
    }
  }, [raffleInfo]);

  const fetchNFTmetadata = async (contract: string, id: string) => {
    const metadata = await fetch(
      `https://polygon-mainnet.g.alchemy.com/nft/v3/TVOCjg2k3i3ekJTneXKShjj80kgGs8xO/getNFTMetadata?contractAddress=${contract}&tokenId=${id}&refreshCache=false`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const metadataJson = await metadata.json();
    console.log(metadataJson);
    setNFT(metadataJson);
  };
  useEffect(() => {
    if (raffle.length > 0 && raffle[0] && raffle[1]) {
      fetchNFTmetadata(raffle[0].toString(), raffle[1].toString());
    }
  }, [raffle]);

  return (
    <>
      {raffle[8] == open && (
        <div className="card w-full bg-white text-primary-content">
          <div className="card-body">
            <h2 className="card-title flex  flex-row items-center">
              <span className="font-bold text-2xl">
                {raffle[10].toString()}
              </span>
              <span
                className=" cursor-pointer"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${window.location.hostname}/marketplace/raffle/${address}`
                  )
                }
              >
                <FaLink />
              </span>
            </h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-sm">Tickets Sold</div>
                <div className="stat-value text-sm">{raffle[6].toString()}</div>
              </div>{" "}
              <div className="stat">
                <div className="stat-title text-sm">Total Tickets</div>
                <div className="stat-value text-sm">{raffle[3].toString()}</div>
              </div>
            </div>
            <div className="stats shadow"></div>
            <div className="stats">
              <div className="stat">
                <div className="stat-title text-sm">Raffling</div>
                <div className="stat-value text-sm">
                  {nft.name ?? nft?.contract?.name}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-sm ">Ticket Price</div>
                <div className="stat-value text-sm ">
                  {Number(raffle[2].toString()) / 10 ** 18} $
                  {getTokenName(raffle[4].toString())}
                </div>
              </div>
            </div>
          </div>
          <div className="card-actions flex  flex-row justify-between items-center">
            {open && (
              <div className="w-full">
                {owner ? (
                  <div className="w-full flex flex-row ">
                    <PickWinnerButton raffleAddress={address} />
                    <CancelRaffleButton raffleAddress={address} />
                  </div>
                ) : (
                  <div className="w-full flex flex-row ">
                    <ApproveButton
                      tokenAddress={raffle[4].toString()}
                      spender={address}
                      args={BigInt(raffle[2].toString())}
                      style={
                        "btn btn-primary w-[50%] rounded-none  rounded-bl-xl h-14"
                      }
                    />
                    <BuyButton
                      tokenAddress={raffle[4].toString()}
                      raffleAddress={address}
                      ticketCost={Number(raffle[2].toString())}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {open === undefined && Number(userBalance?.toString()) > 0 && (
        <div className="card w-full bg-white text-primary-content">
          <div className="card-body">
            <h2 className="card-title">
              <span className="font-bold text-2xl">
                {raffle[10].toString()}
              </span>
              <div
                className={`badge ${
                  raffle[9] === true
                    ? "badge-error text-white"
                    : raffle[8] === true
                    ? "badge-primary badge-primary-content"
                    : "badge-secondary-content badge-secondary"
                }`}
              >
                {raffle[9] === true ? (
                  "cancelled"
                ) : (
                  <p>{raffle[8] === true ? "open" : "closed"}</p>
                )}
              </div>
            </h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-sm">Tickets Sold</div>
                <div className="stat-value text-sm">{raffle[6].toString()}</div>
              </div>{" "}
              <div className="stat">
                <div className="stat-title text-sm">Total Tickets</div>
                <div className="stat-value text-sm">{raffle[3].toString()}</div>
              </div>
            </div>
            <div className="stats shadow"></div>
            <div className="stats">
              <div className="stat">
                <div className="stat-title text-sm">Raffling</div>
                <div className="stat-value text-sm">
                  {nft.name ?? nft?.contract?.name}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-sm ">Ticket Price</div>
                <div className="stat-value text-sm ">
                  {Number(raffle[2].toString()) / 10 ** 18} $
                  {getTokenName(raffle[4].toString())}
                </div>
              </div>
            </div>
          </div>

          <div className="card-actions flex  flex-row justify-between items-center">
            {raffle[9] === true ? (
              <ClaimCancelledRaffleButton raffleAddress={address} />
            ) : (
              <button
                disabled
                className="btn disabled:bg-accent h-14 disabled:text-white w-full rounded-none rounded-b-xl"
              >
                {raffle[8] === false && raffle[9] === false
                  ? `Winner: ${raffle[11].toString().slice(0, 6)}...${raffle[11]
                      .toString()
                      .slice(-4)}`
                  : `You have ${userBalance?.toString()} Tickets`}
              </button>
            )}
          </div>
        </div>
      )}
      {open === undefined && owner === undefined && (
        <div className="card w-full bg-white text-primary-content">
          <div className="card-body">
            <h2 className="card-title">
              <span className="font-bold text-2xl">
                {raffle[10].toString()}
              </span>
              <div
                className={`badge ${
                  raffle[9] === true
                    ? "badge-error text-white"
                    : raffle[8] === true
                    ? "badge-primary badge-primary-content"
                    : "badge-secondary-content badge-secondary"
                }`}
              >
                {raffle[9] === true ? (
                  "cancelled"
                ) : (
                  <p>{raffle[8] === true ? "open" : "closed"}</p>
                )}
              </div>
            </h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-sm">Tickets Sold</div>
                <div className="stat-value text-sm">{raffle[6].toString()}</div>
              </div>{" "}
              <div className="stat">
                <div className="stat-title text-sm">Total Tickets</div>
                <div className="stat-value text-sm">{raffle[3].toString()}</div>
              </div>
            </div>
            <div className="stats shadow"></div>
            <div className="stats">
              <div className="stat">
                <div className="stat-title text-sm">Raffling</div>
                <div className="stat-value text-sm">
                  {nft.name ?? nft?.contract?.name}
                </div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title text-sm ">Ticket Price</div>
                <div className="stat-value text-sm ">
                  {Number(raffle[2].toString()) / 10 ** 18} $
                  {getTokenName(raffle[4].toString())}
                </div>
              </div>
            </div>
          </div>

          <div className="card-actions flex  flex-row justify-between items-center">
            {raffle[9] === true ? (
              <ClaimCancelledRaffleButton raffleAddress={address} />
            ) : (
              <button
                disabled
                className="btn disabled:bg-accent h-14 disabled:text-white w-full rounded-none rounded-b-xl"
              >
                {raffle[8] === false && raffle[9] === false
                  ? `Winner: ${raffle[11].toString().slice(0, 6)}...${raffle[11]
                      .toString()
                      .slice(-4)}`
                  : `You have ${userBalance?.toString()} Tickets`}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RaffleCard;
