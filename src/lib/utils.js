export const getNodeURL = () => {
  return process.env.REACT_APP_USE_DATAHUB === "true"
    ? `https://${process.env.REACT_APP_DATAHUB_DEVNET_URL}/apikey/${process.env.REACT_APP_API_KEY}`
    : process.env.REACT_APP_DEVNET_URL;
}

export const getExplorerAddressURL = (address) => {
  return `https://explorer.solana.com/address/${address}?cluster=devnet`;
}