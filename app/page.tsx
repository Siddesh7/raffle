import {ConnectButton} from "@rainbow-me/rainbowkit";
import Image from "next/image";
import CreateRaffleForm from "./components/CreateRaffleForm";
import ApproveButton from "./components/ApproveButton";
import {UD_ADDRESS} from "./lib/contants";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />

      <div></div>
      <CreateRaffleForm />
    </main>
  );
}
