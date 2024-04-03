import React, {useEffect} from "react";
import {raffleABI} from "../lib/contants";

import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {toast} from "react-toastify";
interface PickWinnerButtonProps {
  raffleAddress: `0x${string}`;
  style?: string;
}
const PickWinnerButton: React.FC<PickWinnerButtonProps> = ({
  raffleAddress,
  style,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const pickWinner = async () => {
    writeContract({
      abi: raffleABI,
      address: raffleAddress,
      functionName: "pickWinner",
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Winner picked successfully");
    }
    if (error) {
      if (error?.message.includes("not sold enough")) {
        toast.error("You cannot pick a winner until all tickets are sold");
      } else toast.error(`Error Picking winner`);
    }
  }, [status, isSuccess, error]);
  return (
    <button
      className={`btn btn-primary w-[50%] rounded-none  rounded-bl-xl h-14 disabled:text-black disabled:cursor-not-allowed ${style}`}
      onClick={pickWinner}
      disabled={isPending || isLoading || isSuccess}
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
        <p> {isSuccess ? "Tx Sent " : "Pick Winner"}</p>
      )}
    </button>
  );
};

export default PickWinnerButton;
