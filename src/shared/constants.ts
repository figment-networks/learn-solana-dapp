import { ProtocolsType } from "./types";

export const PROTOCOLS: ProtocolsType = {
  AVALANCHE: {
    id: "avalanche",
    active: true,
    logoUrl: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=010",
    steps: [
      {
        id: "connect",
        title: "Connect to the Avalanche network",
        url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/1.-connect-to-avalanche-node-with-datahub"
      },
      {
        id: "account",
        title: "Create an Account/Keypair",
        url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/2.-create-your-first-avalanche-account"
      },
      {
        id: "fund",
        title: "Fund the account with AVAX",
        url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/3.-query-the-avalanche-network"
      },
      {
        id: "balance",
        title: "Check your account balance",
        url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/4.-create-your-first-transaction"
      },
      {
        id: "transfer",
        title: "Transfer AVAX tokens between accounts",
        url: "https://learn.figment.io/network-documentation/avalanche/tutorials/pathway/5.-cross-chain-token-transfers"
      },
    ]
  },
  CELO: {
    id: "celo",
    active: false,
    logoUrl: "https://cryptologos.cc/logos/celo-celo-logo.svg?v=010",
  },
  NEAR: {
    id: "near",
    active: false,
    logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010",
  },
  POLKADOT: {
    id: "polkadot",
    active: false,
    logoUrl: "https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=010",
  },
  SECRET: {
    id: "secret",
    active: false,
    logoUrl: "https://cryptologos.cc/logos/secret-scrt-logo.svg?v=010",
  },
  SOLANA: {
    id: "solana",
    active: true,
    logoUrl: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=010",
    steps: [
      {
        id: "connect",
        title: "Connect to the Solana devnet cluster",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/connect"
      },
      {
        id: "account",
        title: "Create an Account/Keypair",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/keypair"
      },
      {
        id: "fund",
        title: "Fund the account with SOL",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/fund"
      },
      {
        id: "balance",
        title: "Check your account's balance",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/balance"
      },
      {
        id: "transfer",
        title: "Transfer SOL tokens between accounts",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/transfer"
      },
      {
        id: "deploy",
        title: "Deploy a Program",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/deploy"
      },
      {
        id: "call",
        title: "Call a Program",
        url: "https://learn.figment.io/network-documentation/solana/solana-pathway/call"
      },
    ]
  },
  TEZOS: {
    id: "tezos",
    active: false,
    logoUrl: "https://cryptologos.cc/logos/near-protocol-near-logo.svg?v=010",
  },
}