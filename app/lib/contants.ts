export const raffleFactoryABI = [
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_prizeNFT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_prizeNFTId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_entryFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketLimit",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_ticketBound",
        type: "bool",
      },
      {
        internalType: "contract IERC20",
        name: "_acceptedPaymentToken",
        type: "address",
      },
    ],
    name: "deployRaffle",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedContracts",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deployedRaffles",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllDeployedRaffles",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "deployer",
        type: "address",
      },
    ],
    name: "getDeployedRaffle",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const raffleABI = [
  {
    inputs: [
      {
        internalType: "contract IERC721",
        name: "_prizeNFT",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_prizeNFTId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_entryFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_ticketLimit",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_ticketBound",
        type: "bool",
      },
      {
        internalType: "contract IERC20",
        name: "_acceptedPaymentToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "acceptedPaymentToken",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buyTicket",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "entryFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRaffleInfo",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numTicketsSold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "prizeNFT",
    outputs: [
      {
        internalType: "contract IERC721",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "prizeNFTId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ticketBound",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ticketLimit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tickets",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawRemainingFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
export const UD_ADDRESS = "0x8f1EcC46C0EE1E011E623DF6af8fd4DCf680b587";
export const USDC_ADDRESS = "0x1AA3846E31b4EB98511c326E3BCe1Bf96DE2B148";
export const USDT_ADDRESS = "0xECB22c4a9825CC6d653dFd1397C30336a0401527";
export const raffleFactoryAddress =
  "0x583E672B08799A80ec8bEdB834cF0a978434Cd2f";
export const getTokenAddress = (token: string) => {
  switch (token) {
    case "USDC":
      return USDC_ADDRESS;
    case "USDT":
      return USDT_ADDRESS;
    default:
      return "";
  }
};
export const getTokenName = (address: string) => {
  switch (address) {
    case USDC_ADDRESS:
      return "USDC";
    case USDT_ADDRESS:
      return "USDT";
    default:
      return "";
  }
};
