"use client";
import {useState} from "react";
import CreateRaffleForm from "./components/CreateRaffleForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main>
      <div className="hero min-h-[90vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there anon!</h1>
            <p className="py-6">
              Your gateway to web3 raffles where domains worth thousands are up
              for grabs! With tickets as low as $1, anyone can vie for the
              chance to own a premium domain valued at $5000 or more.
            </p>
            <div className="flex flex-row gap-2 justify-center">
              <button
                className="btn btn-primary"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                Create a Raffle
              </button>
              <Link href="/marketplace">
                <p className="btn btn-secondary">Buy Tickets</p>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CreateRaffleForm
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      <ToastContainer position="top-right" />
    </main>
  );
}
