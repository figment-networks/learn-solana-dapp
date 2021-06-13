export const getNodeURL = () => {
  return process.env.REACT_APP_USE_DATAHUB === "true"
    ? `https://${process.env.REACT_APP_DATAHUB_DEVNET_URL}/apikey/${process.env.REACT_APP_DATAHUB_API_KEY}`
    : process.env.REACT_APP_DEVNET_URL;
}

export const getAccountExplorerURL = (address) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}

export const getTxExplorerURL = (signature) => {
  return `https://explorer.solana.com/tx/${signature}?cluster=devnet`;
}