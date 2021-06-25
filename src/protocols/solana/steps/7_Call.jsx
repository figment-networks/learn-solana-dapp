import { useState, useEffect } from "react";
import * as borsh from 'borsh';
import { Alert, Button, Space, Col, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Connection,
  PublicKey,
  Keypair,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Transaction,
  SystemProgram} from "@solana/web3.js";

import { getNodeRpcURL, getAccountExplorerURL, getNodeWsURL, getTxExplorerURL } from "../utils";

const { Text } = Typography;

// The state of a greeting account managed by the hello world program
class GreetingAccount {
  counter = 0;
  constructor(fields = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

// Borsh schema definition for greeting accounts
const GreetingSchema = new Map([
  [GreetingAccount, {kind: 'struct', fields: [['counter', 'u32']]}],
]);

// The expected size of each greeting account.
const GREETING_SIZE = borsh.serialize(
  GreetingSchema,
  new GreetingAccount(),
).length;

const PAYER_SECRET_KEY = [200,120,107,7,200,136,174,237,23,28,105,124,253,97,12,122,209,212,245,192,174,185,249,118,111,113,165,49,130,107,227,48,79,3,244,85,252,195,170,158,199,17,209,193,197,235,83,167,118,155,162,2,133,233,71,170,208,64,202,140,162,105,67,239];
const PROGRAM_SECRET_KEY = [198,20,157,57,145,69,187,143,44,42,162,68,79,99,242,254,36,250,168,106,44,154,233,90,172,234,196,99,64,69,84,47,27,99,122,149,188,239,56,122,107,127,162,130,7,89,136,156,186,109,9,127,191,205,187,187,166,184,54,187,255,102,165,120];

const Program = () => {
  const [connection, setConnection] = useState(null);
  const [programId, setProgramId] = useState(null);
  const [greeterPublicKey, setGreeterPublicKey] = useState(null);
  const [greetingsCounter, setGreetingsCounter] = useState(null);
  const [greetFetching, setGreetFetching] = useState(false);
  const [greetTxSignature, setGreetTxSignature] = useState(null);

  useEffect(() => {
    establishConnection();
  }, [])

  const establishConnection = () => {
    const url = getNodeRpcURL();
    const connection = new Connection(url, { wsEndpoint: getNodeWsURL() });
    setConnection(connection);
  }

  const checkProgram = async () => {
    if (!PAYER_SECRET_KEY || !PROGRAM_SECRET_KEY) {
      alert("Set PAYER_SECRET_KEY and PROGRAM_SECRET_KEY first!")
    }

    const programSecretKey = new Uint8Array(PROGRAM_SECRET_KEY);
    const programKeypair = Keypair.fromSecretKey(programSecretKey);
    const programId = programKeypair.publicKey;
    setProgramId(programId);
  
    // // Check if the program has been deployed
    // await connection.getAccountInfo(programId);
    // console.log(`Using program ${programId.toBase58()}`);

    const payerSecretKey = new Uint8Array(PAYER_SECRET_KEY);
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);
  
    // Derive the address of a greeting account from the program so that it's easy to find later.
    const GREETING_SEED = 'hello';
    const greetedPubkey = await PublicKey.createWithSeed(
      payerKeypair.publicKey,
      GREETING_SEED,
      programId,
    );
    setGreeterPublicKey(greetedPubkey)
  
    // Check if the greeting account has already been created
    const greetedAccount = await connection.getAccountInfo(greetedPubkey);
    if (greetedAccount === null) {
      console.log('Creating account', greetedPubkey.toBase58(), 'to say hello to');
      const lamports = await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);
  
      const transaction = new Transaction().add(
        SystemProgram.createAccountWithSeed({
          fromPubkey: payerKeypair.publicKey,
          basePubkey: payerKeypair.publicKey,
          seed: GREETING_SEED,
          newAccountPubkey: greetedPubkey,
          lamports,
          space: GREETING_SIZE,
          programId,
        }),
      );

      sendAndConfirmTransaction(connection, transaction, [payerKeypair])
        .then(res => console.log(`res`, res))
        .catch(err => console.log(`err`, err))
    }
  }

  const greet = async () => {
    alert("Implement the greet() function!");

    // Load the payer's Keypair from the Uint8Array PAYER_SECRET_KEY
    // by using Keypair.fromsecretkey
    // https://solana-labs.github.io/solana-web3.js/classes/keypair.html#fromsecretkey
  
    // Create the TransactionInstruction by passing keys, programId and data
    // For data you can pass Buffer.alloc(0) as all the program's instructions are the same
  
    // Call sendAndConfirmTransaction
    // https://solana-labs.github.io/solana-web3.js/modules.html#sendandconfirmtransaction
    // On success, call getGreetings() to fetch the greetings counter
  }

  const getGreetings = async () => {
    const accountInfo = await connection.getAccountInfo(greeterPublicKey);

    if (accountInfo === null) throw 'Error: cannot find the greeted account';

    const greeting = borsh.deserialize(
      GreetingSchema,
      GreetingAccount,
      accountInfo.data,
    );
    
    setGreetingsCounter(greeting.counter);
  }

  if (!greeterPublicKey) {
    return (
      <Space>
        <Button type="primary" onClick={checkProgram}>Check Program Info</Button>
      </Space>
    )
  }
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="horizontal" size="large">
          <Button type="default" onClick={checkProgram}>Check Program Info</Button>
          <Text strong>Program deployed!</Text>
          <a href={getAccountExplorerURL(programId.toString())} target="_blank" rel="noreferrer">View program on Solana Explorer</a>
        </Space>
        <Button type="primary" onClick={greet}>Send a greeting to the program</Button>
        {
          greetFetching &&
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
              <Text italic={true} type="secondary">Transaction initiated. Waiting for confirmations...</Text>
            </Space>
        }
        {
          greetTxSignature && !greetFetching &&
            <Alert
              message={
                <Space direction="horizontal">
                  <Text strong>Transaction confirmed!</Text>
                  <Text>{`Greetings Counter: ${greetingsCounter}`}</Text>
                </Space>
              }
              description={
                <a href={getTxExplorerURL(greetTxSignature)} target="_blank" rel="noreferrer">View transaction on Solana Explorer</a>
              }
              type="success"
              showIcon
            />
        }
      </Space>
    </Col>
  );
}

export default Program