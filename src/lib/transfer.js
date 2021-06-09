import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from "@solana/web3.js";

async function main() {
  const url = "https://api.testnet.solana.com"
  const connection = new Connection(url);
  const fromPubKey = new PublicKey('4v7USGPRKnTkZ8ojZ1Ph4h4sJXamLd1BPMdapHmEQukS');
  const toPubKey = new PublicKey('EbpGukGyV3zsZ7M8nkvSxLPRWBQdTjYkbz9LJNbpt7vi');

  const signers = [
    {
      publicKey: new PublicKey('4v7USGPRKnTkZ8ojZ1Ph4h4sJXamLd1BPMdapHmEQukS'),
      secretKey: new Uint8Array([195,145,183,227,163,132,245,205,35,170,103,9,204,205,218,217,192,24,206,40,55,111,161,254,107,15,103,254,41,35,140,40,58,46,41,169,14,12,97,138,62,171,37,85,93,5,232,144,107,130,221,248,111,65,247,126,123,147,81,156,126,230,42,143])
    }
  ];

  const instructions = SystemProgram.transfer({
    fromPubkey: fromPubKey,
    toPubkey: toPubKey,
    lamports: 10000,  // 10^9 = 1 SOL
  });
  const transaction = new Transaction();
  transaction.add(instructions)

  sendAndConfirmTransaction(
    connection,
    transaction,
    signers,
    {
      confirmations: 1,
    }
  )
  .then((signature) => {
    console.log("Success ->", signature);
  })
  .catch((err) => {
    console.log(err)
  })
}

main();
