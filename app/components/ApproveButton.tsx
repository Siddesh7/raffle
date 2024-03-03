"use client";
import React from "react";
import {useWriteContract} from "wagmi";
import {erc20Abi, erc721Abi} from "viem";
import {raffleFactoryAddress} from "../lib/contants";
interface ApproveButtonProps {
  tokenAddress: `0x${string}`;
  args: any;
  spender: `0x${string}`;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
  tokenAddress,
  args,
  spender,
}) => {
  const {writeContractAsync, data: hash, status} = useWriteContract();
  const approveToken = async () => {
    console.log(`Approving token ${tokenAddress}`);
    await writeContractAsync({
      abi: erc721Abi,
      address: tokenAddress,
      functionName: "approve",
      args: [spender, args],
    });
    console.log(`Token ${tokenAddress} approved`);
    console.log(`Transaction hash: ${hash}`);
    console.log(`Transaction status: ${status}`);
  };
  return (
    <button className="btn btn-secondary" onClick={approveToken}>
      Approve
    </button>
  );
};

export default ApproveButton;
