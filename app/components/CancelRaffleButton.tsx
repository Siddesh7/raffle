import React, {useEffect} from "react";
import {raffleABI} from "../lib/contants";

import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {toast} from "react-toastify";
interface CancelRaffleButtonProps {
  raffleAddress: `0x${string}`;
  style?: string;
}
const CancelRaffleButton: React.FC<CancelRaffleButtonProps> = ({
  raffleAddress,
  style,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const cancelRaffle = async () => {
    writeContract({
      abi: raffleABI,
      address: raffleAddress,
      functionName: "cancelAuctionAndWithdrawNFT",
    });
  };

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Raffle cancelled successfully");
    }
    if (error) {
      toast.error(`Error cancelling raffle`);
    }
  }, [status, isSuccess, error]);
  return (
    <button
      className={`btn btn-secondary  w-[50%] rounded-none  rounded-br-xl h-14 disabled:text-black disabled:cursor-not-allowed ${style}`}
      onClick={cancelRaffle}
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
        <p> {isSuccess ? "Tx Sent " : "Cancel Raffle"}</p>
      )}
    </button>
  );
};

export default CancelRaffleButton;
