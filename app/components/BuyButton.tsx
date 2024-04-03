import React, {useEffect} from "react";
import {erc20Abi} from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {raffleABI} from "../lib/contants";
import {toast} from "react-toastify";
interface BuyButtonProps {
  tokenAddress: `0x${string}`;
  raffleAddress: `0x${string}`;
  ticketCost: number;
  style?: string;
}
const BuyButton: React.FC<BuyButtonProps> = ({
  tokenAddress,
  raffleAddress,
  ticketCost,
  style,
}) => {
  const {writeContract, data, status, isPending, error, failureReason} =
    useWriteContract();
  const {address: userAddress} = useAccount();
  const buyTicket = async () => {
    writeContract({
      abi: raffleABI,
      address: raffleAddress,
      functionName: "buyTicket",
    });
  };
  const {data: userAllowance} = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [userAddress as `0x${string}`, raffleAddress],
  });

  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully bought ticket");
    }
    if (error) {
      console.log("error", error);
      if (
        error?.message.includes(
          "Insufficient token spend allowance to buy a ticket"
        )
      ) {
        toast.warning("Please click approve button to approve token spend");
      } else toast.error(`Something went wrong`);
    }
  }, [status, isSuccess, error]);
  return (
    <button
      className={`btn btn-secondary  w-[50%] rounded-none  rounded-br-xl h-14 disabled:text-black disabled:cursor-not-allowed ${style}`}
      onClick={buyTicket}
      disabled={isPending || isLoading}
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
        "Buy Ticket"
      )}
    </button>
  );
};

export default BuyButton;
