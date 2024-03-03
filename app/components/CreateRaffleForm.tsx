"use client";
import React, {useEffect, useState} from "react";
import {useAccount, useWriteContract} from "wagmi";
import {
  UD_ADDRESS,
  USDC_ADDRESS,
  getTokenAddress,
  raffleFactoryABI,
  raffleFactoryAddress,
} from "../lib/contants";
import ApproveButton from "./ApproveButton";

const CreateRaffleForm = () => {
  const {address} = useAccount();
  const [NFTs, setNFTs] = useState<any[]>([]);
  const [selectedNft, setSelectedNFT] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number>(10);
  const [totalTickets, setTotalTickets] = useState<number>(2);
  const [acceptedTokenAddress, setAcceptedTokenAddress] =
    useState<string>(USDC_ADDRESS);
  const {writeContractAsync, data: hash} = useWriteContract();

  const getNFTs = async () => {
    if (!address) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL}/getNFTsForOwner/?owner=${address}`
    );
    const resJson = await res.json();
    const ownedNFTs = resJson.ownedNfts;
    console.log("ownedNFTs", ownedNFTs);
    if (ownedNFTs.length > 0) {
      setSelectedNFT(
        ownedNFTs[0].contract.address + ":" + ownedNFTs[0].id.tokenId
      );
    }
    setNFTs(ownedNFTs);
  };

  const createRaffle = async () => {
    console.log("Creating raffle");
    const [nftAddress, tokenId] = selectedNft.split(":");
    await writeContractAsync({
      abi: raffleFactoryABI,
      address: raffleFactoryAddress,
      functionName: "deployRaffle",
      args: [
        nftAddress,
        tokenId,
        ticketPrice * 10 ** 18,
        totalTickets,
        true,
        acceptedTokenAddress,
      ],
    });
  };

  useEffect(() => {
    getNFTs();
  }, [address]);

  return (
    <div className="card w-96 bg-primary text-primary-content">
      <div className="card-body">
        <p className="text-extrabold text-2xl text-center">
          Create your raffle
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <label htmlFor="nft" className="text-bold text-g mb-1">
              Choose the NFT to raffle
            </label>

            <select
              name="nft"
              className="btn max-w-[100%] text-primary bg-base-100 border-black border-2 rounded-md p-2 text-left"
              id="nft"
              value={selectedNft}
              onChange={(e) => setSelectedNFT(e.target.value)}
              disabled={NFTs.length === 0}
            >
              {NFTs.map((nft, index) => {
                return (
                  <option
                    key={index}
                    value={`${nft.contract.address}:${nft.id.tokenId}`}
                  >
                    {nft.contractMetadata.name}
                  </option>
                );
              })}
            </select>
            {NFTs.length === 0 && (
              <p className="text-primary">You don&apos;t have any NFTs</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="nft" className="text-bold text-g mb-1">
              Payment Token
            </label>

            <select
              name="nft"
              className="btn max-w-[100%] text-primary bg-base-100 border-black border-2 rounded-md p-2 text-left"
              id="nft"
              value={acceptedTokenAddress}
              onChange={(e) => setAcceptedTokenAddress(e.target.value)}
            >
              {["USDC", "USDT"].map((nft, index) => {
                return (
                  <option key={index} value={getTokenAddress(nft)}>
                    {nft}
                  </option>
                );
              })}
            </select>
            {NFTs.length === 0 && (
              <p className="text-primary">You don&apos;t have any NFTs</p>
            )}
          </div>
          <label htmlFor="ticketPrice" className="text-bold text-g mb-1">
            Ticket Price
          </label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            placeholder="Ticket Price"
            className="input w-full max-w-xs text-primary  bg-base-100 border-black border-2 rounded-md p-2"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(Number(e.target.value))}
          />
          <label htmlFor="totalTickets" className="text-bold text-g mb-1">
            Total tickets
          </label>
          <input
            type="number"
            id="totalTickets"
            name="totalTickets"
            placeholder="Total tickets"
            className="input w-full max-w-xs text-primary  bg-base-100 border-black border-2 rounded-md p-2"
            value={totalTickets}
            onChange={(e) => setTotalTickets(Number(e.target.value))}
          />
          <div className="mt-4 flex flex-col gap-2">
            {" "}
            <ApproveButton
              tokenAddress={UD_ADDRESS}
              spender={raffleFactoryAddress}
              args={selectedNft.split(":")[1]}
            />
            <button className="btn btn-success" onClick={createRaffle}>
              Create a Raffle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRaffleForm;
