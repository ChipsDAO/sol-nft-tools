import { clusterApiUrl } from "@solana/web3.js";

export const ENDPOINTS = [
  {
    name: "GenesysGo",
    endpoint: "https://pentacle.genesysgo.net",
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