import { clusterApiUrl } from "@solana/web3.js";

export const ENDPOINTS = [
  {
    name: "GenesysGo",
    endpoint: "https://lokidfxnwlabdq.main.genesysgo.net:8899",
  },
  {
    name: "Metaplex",
    endpoint: "https://api.metaplex.solana.com",
  },
  {
    name: "Solana",
    endpoint: "https://api.mainnet-beta.solana.com",
  },
  {
    name: "Serum",
    endpoint: "https://solana-api.projectserum.com",
  },
  {
    name: "testnet",
    endpoint: clusterApiUrl("testnet"),
  },
  {
    name: "devnet",
    endpoint: clusterApiUrl("devnet"),
  },
];