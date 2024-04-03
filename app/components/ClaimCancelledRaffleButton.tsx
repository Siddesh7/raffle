import React, {useEffect} from "react";
import {raffleABI} from "../lib/contants";

import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {toast} from "react-toastify";
interface ClaimCancelledRaffleButtonProps {
  raffleAddress: `0x${string}`;
  style?: string;
}
const ClaimCancelledRaffleButton: React.FC<ClaimCancelledRaffleButtonProps> = ({
  raffleAddress,
  style,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const claimFunds = async () => {
    writeContract({
      abi: raffleABI,
      address: raffleAddress,
      functionName: "withdrawFunds",
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    console.log(error, failureReason);
    if (isSuccess) {
      toast.success("Funds claimed successfully");
    }
    if (error) {
      toast.error(`Error claiming your funds`);
    }
  }, [status, isSuccess, error]);
  return (
    <button
      className={`btn btn-secondary  w-full rounded-none  rounded-br-xl h-14 disabled:text-black disabled:cursor-not-allowed ${style}`}
      onClick={claimFunds}
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
        <p> {isSuccess ? "Tx Sent " : "Claim your funds"}</p>
      )}
    </button>
  );
};

export default ClaimCancelledRaffleButton;
