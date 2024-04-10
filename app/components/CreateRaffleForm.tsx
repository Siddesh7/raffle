"use client";
import React, {useEffect, useState} from "react";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

import {
  UD_ADDRESS,
  USDC_ADDRESS,
  getTokenAddress,
  raffleFactoryABI,
  raffleFactoryAddress,
} from "../lib/contants";
import ApproveButton from "./ApproveButton";
import Confetti from "react-confetti";
import ConnectWalletButton from "./ConnectWalletButton";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRaffleForm = ({
  showModal,
  onClose,
}: {
  showModal: boolean;
  onClose: () => void;
}) => {
  const {address, isConnected} = useAccount();
  const [NFTs, setNFTs] = useState<any[]>([]);
  const [selectedNft, setSelectedNFT] = useState<string>("");
  const [ticketPrice, setTicketPrice] = useState<number>(10);
  const [totalTickets, setTotalTickets] = useState<number>(2);
  const [raffleName, setRaffleName] = useState<string>("");
  const [tokenApproved, setTokenApproved] = useState<boolean>(false);
  const [acceptedTokenAddress, setAcceptedTokenAddress] =
    useState<string>(USDC_ADDRESS);

  const {writeContract, data, status, isPending} = useWriteContract();

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
    const [nftAddress, tokenId] = selectedNft.split(":");
    writeContract({
      abi: raffleFactoryABI,
      address: raffleFactoryAddress,
      functionName: "deployRaffle",
      args: [
        nftAddress,
        tokenId,
        ticketPrice * 10 ** 6,
        totalTickets,
        true,
        acceptedTokenAddress,
        raffleName,
      ],
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (isSuccess) {
      toast("Raffle Created! Redirecting to raffle page");
      setTimeout(() => {
        window.location.href = "/my-raffles";
      }, 3000);
    }
  }, [isSuccess]);

  useEffect(() => {
    getNFTs();
  }, [address]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showModal && !target.closest(".card")) {
        onClose();
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showModal, onClose]);

  return (
    <div>
      {showModal ? (
        <div className="absolute top-0 w-[100vw] h-[100vh] flex justify-center items-center bg-opacity-20 backdrop-blur-xl bg-white/10 z-[50]">
          <div className="card w-[30rem] bg-gray-300 text-black">
            <div className="card-body">
              <p className="text-extrabold text-2xl text-center">
                Create your raffle
              </p>
              <button
                className="btn btn-sm btn-circle  border-none absolute right-4 top-4"
                onClick={onClose}
              >
                ✕
              </button>
              <div className="flex flex-col gap-2">
                <label htmlFor="raffleName" className="text-bold text-g mb-1">
                  Raffle Name
                </label>
                <input
                  type="text"
                  id="raffleName"
                  name="raffleName"
                  placeholder="Raffle Name"
                  className="input w-full  text-primary   border-2 rounded-md p-2"
                  value={raffleName}
                  onChange={(e) => setRaffleName(e.target.value)}
                />
                <div className="flex flex-col">
                  <label htmlFor="nft" className="text-bold text-g mb-1">
                    Choose the NFT to raffle
                  </label>

                  <select
                    name="nft"
                    className="btn max-w-[100%] text-primary border-2 rounded-md p-2 text-left"
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
                          {nft.title}
                        </option>
                      );
                    })}
                  </select>
                  {NFTs.length === 0 && (
                    <p className="text-error">You don&apos;t have any NFTs</p>
                  )}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="nft" className="text-bold text-g mb-1">
                    Payment Token
                  </label>

                  <select
                    name="nft"
                    className="btn max-w-[100%] text-primary border-2 rounded-md p-2 text-left"
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
                    <p className="text-error">You don&apos;t have any NFTs</p>
                  )}
                </div>
                <label htmlFor="ticketPrice" className="text-bold text-g mb-1">
                  Ticket Price
                </label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  id="ticketPrice"
                  name="ticketPrice"
                  placeholder="Ticket Price"
                  className="input w-full  text-primary border-2 rounded-md p-2"
                  value={ticketPrice}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setTicketPrice(Number(e.target.value));
                  }}
                />
                <label htmlFor="totalTickets" className="text-bold text-g mb-1">
                  Total tickets
                </label>
                <input
                  type="text"
                  pattern="[0-9]*"
                  id="totalTickets"
                  name="totalTickets"
                  placeholder="Total tickets"
                  className="input w-full  text-primary border-2 rounded-md p-2"
                  value={totalTickets}
                  onChange={(e) => {
                    if (/^[0-9]*$/.test(e.target.value))
                      setTotalTickets(Number(e.target.value));
                  }}
                />
                {isConnected ? (
                  <div className="mt-4 flex flex-col gap-2">
                    <ApproveButton
                      tokenAddress={UD_ADDRESS}
                      spender={raffleFactoryAddress}
                      args={selectedNft.split(":")[1]}
                      onApprove={() => {
                        setTokenApproved(true);
                        console.log("Token approved");
                      }}
                    />
                    <button
                      className="btn btn-success  disabled:text-black "
                      onClick={createRaffle}
                      disabled={!tokenApproved || isLoading || isPending}
                    >
                      {isPending ? (
                        <div className="flex flex-row justify-center items-center gap-2">
                          <span>Sign in wallet</span>
                          <span className="loading loading-spinner loading-md"></span>
                        </div>
                      ) : isLoading ? (
                        <div className="flex flex-row justify-center items-center gap-2">
                          <span>Loading</span>
                          <span className="loading loading-spinner loading-md"></span>
                        </div>
                      ) : (
                        "Create Raffle"
                      )}
                    </button>
                  </div>
                ) : (
                  <ConnectWalletButton style={"w-full btn-accent mt-6"} />
                )}
              </div>
            </div>
          </div>{" "}
          {isSuccess && (
            <Confetti
              className="z-[100]"
              width={window.innerWidth}
              height={window.innerHeight}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default CreateRaffleForm;
