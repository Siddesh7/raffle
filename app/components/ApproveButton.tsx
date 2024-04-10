"use client";
import React, {useEffect} from "react";
import {useWaitForTransactionReceipt, useWriteContract} from "wagmi";
import {erc721Abi} from "viem";
import {toast} from "react-toastify";

interface ApproveButtonProps {
  tokenAddress: `0x${string}`;
  args: any;
  spender: `0x${string}`;
  onApprove?: () => void;
  style?: string;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
  tokenAddress,
  args,
  spender,
  onApprove,
  style,
}) => {
  const {writeContract, data, status, isPending, error} = useWriteContract();

  const approveToken = async () => {
    console.log(`Approving token ${tokenAddress}`);
    writeContract({
      abi: erc721Abi,
      address: tokenAddress,
      functionName: "approve",
      args: [spender, args],
    });
  };
  const {isSuccess, isLoading} = useWaitForTransactionReceipt({
    hash: data,
  });
  useEffect(() => {
    if (isSuccess) {
      onApprove && onApprove();
      toast.success("Token Spend Approved");
    }
  }, [status, isSuccess]);

  useEffect(() => {
    console.log("error", error);
    if (error) {
      toast.error("Error approving token");
    }
  }, [error]);
  return (
    <button
      className={`btn btn-primary disabled:text-black ${style}`}
      onClick={approveToken}
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
        <p> {isSuccess ? "Approved " : "Approve"}</p>
      )}
    </button>
  );
};

export default ApproveButton;
