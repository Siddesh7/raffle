import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";

const ConnectWalletButton = ({style}: {style?: string}) => {
  return (
    <div className="flex-none">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className={`btn btn-primary ${style}`}
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="btn btn-primary"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div
                    style={{display: "flex", gap: 12}}
                    className="bg-primary px-4 py-2 rounded-md text-md font-medium text-primary-content"
                  >
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};

export default ConnectWalletButton;
