"use client";
import {useState} from "react";
import CreateRaffleForm from "./components/CreateRaffleForm";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [showModal, setShowModal] = useState(false);
  return (
    <main>
      <div className="hero min-h-[90vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Get Started
            </button>
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
