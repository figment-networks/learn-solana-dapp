import { useState } from "react";
import { Keypair } from "@solana/web3.js";
    
export default function useKeyFromLocalStore() {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = JSON.parse(window.localStorage.getItem("solana_secret_key"));
      if (!item) return null
      
      const secret = Uint8Array.from(item)
      return Keypair.fromSecretKey(secret);
    } catch (error) {
      console.log(error);
      return null;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem("solana_secret_key", JSON.stringify(Array.from(valueToStore._keypair.secretKey)));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
