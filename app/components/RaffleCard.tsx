import React from "react";
import {getTokenName, raffleABI} from "../lib/contants";
import {useReadContract, useWriteContract} from "wagmi";
import ApproveButton from "./ApproveButton";

const RaffleCard = ({
  address,
  owner,
}: {
  address: `0x${string}`;
  owner?: boolean;
}) => {
  const [raffle, setRaffle] = React.useState<any[]>([]);
  const {writeContractAsync, data: hash} = useWriteContract();

  const {data} = useReadContract({
    abi: raffleABI,
    address: address,
    functionName: "getRaffleInfo",
  });

  React.useEffect(() => {
    if (data) {
      console.log(data);
      setRaffle(data as any[]);
    }
  }, [data]);

  const buyTicket = async () => {
    await writeContractAsync({
      abi: raffleABI,
      address: address,
      functionName: "buyTicket",
    });
    console.log(`Ticket bought`);
    console.log(`Transaction hash: ${hash}`);
  };
  const pickWinner = async () => {
    await writeContractAsync({
      abi: raffleABI,
      address: address,
      functionName: "pickWinner",
    });
    console.log(`Winner picked`);
    console.log(`Transaction hash: ${hash}`);
  };
  return (
    <div className="card w-96 bg-primary text-primary-content">
      {raffle.length > 0 && (
        <div className="card-body">
          <h2 className="card-title">UD #{raffle[1].toString()}</h2>
          <div>
            <p>Available Tickets: {raffle[7].toString()}</p>
            <p>Tickets Sold: {raffle[6].toString()}</p>

            <p>Total Tickets: {raffle[3].toString()}</p>
            <p>Reward NFT Domain: UD #{raffle[1].toString()}</p>
          </div>
          <div className="card-actions flex  flex-row justify-between items-center">
            <p className="text-xl text-[green]">
              {Number(raffle[2].toString()) / 10 ** 18} $
              {getTokenName(raffle[4].toString())}
            </p>
            {owner ? (
              <button onClick={pickWinner} className="btn">
                Pick Winner
              </button>
            ) : (
              <div className="flex flex-row gap-2">
                {" "}
                <ApproveButton
                  tokenAddress={raffle[4].toString()}
                  spender={address}
                  args={BigInt(2316752318523187562137312651238)}
                />
                <button onClick={buyTicket} className="btn">
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RaffleCard;
