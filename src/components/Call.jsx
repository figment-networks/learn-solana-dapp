import React, { useState, useEffect } from "react";
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

import { getNodeRpcURL, getAccountExplorerURL, getNodeWsURL, getTxExplorerURL } from "../lib/utils";

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

const PROGRAM_SECRET_KEY = [95,227,165,29,40,100,94,130,63,34,235,240,141,69,149,66,210,130,27,161,35,45,174,15,30,98,223,201,170,28,241,162,192,87,187,55,198,44,171,183,45,110,150,207,24,82,38,139,207,123,12,204,146,148,179,202,15,216,26,222,24,92,153,4];
const PAYER_SECRET_KEY = [148,7,74,174,185,150,202,29,161,11,99,213,101,42,96,16,193,101,160,20,89,223,85,177,226,110,21,184,167,4,196,56,14,255,157,160,80,8,235,147,36,87,139,252,5,1,164,69,65,222,197,77,103,128,244,70,176,161,187,88,167,126,146,253];

const Program = () => {
  const [connection, setConnection] = useState(null);
  const [programId, setProgramId] = useState(null);
  const [greeterPublicKey, setGreeterPublicKey] = useState(null);
  const [greetingsCounter, setGreetingsCounter] = useState(null);
  const [sayHelloFetching, setSayHelloFetching] = useState(false);
  const [sayHelloTxSignature, setSayHelloTxSignature] = useState(null);

  useEffect(() => {
    establishConnection();
  }, [])

  const establishConnection = () => {
    const url = getNodeRpcURL();
    const connection = new Connection(url, { wsEndpoint: getNodeWsURL() });
    setConnection(connection);
  }

  const checkProgram = async () => {
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

  const sayHello = async () => {
    const payerSecretKey = new Uint8Array(PAYER_SECRET_KEY);
    const payerKeypair = Keypair.fromSecretKey(payerSecretKey);

    const instruction = new TransactionInstruction({
      keys: [{pubkey: greeterPublicKey, isSigner: false, isWritable: true}],
      programId,
      data: Buffer.alloc(0), // All instructions are hellos
    });

    setSayHelloFetching(true);
    sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction),
      [payerKeypair],
    ).then(res => {
      console.log(`SUCCESS`, res);
      setSayHelloTxSignature(res);
      setSayHelloFetching(false);
      getGreetings();
    }).catch(err => {
      console.log(`ERROR`, err);
      setSayHelloFetching(false);
    })
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
        <Button type="primary" onClick={sayHello}>Send a greeting to the program</Button>
        {
          sayHelloFetching &&
            <Space size="large">
              <LoadingOutlined style={{ fontSize: 24, color: "#1890ff" }} spin />
              <Text italic type="secondary">Transaction initiated. Waiting for confirmations...</Text>
            </Space>
        }
        {
          sayHelloTxSignature && !sayHelloFetching &&
            <Alert
              message={
                <Space direction="horizontal">
                  <Text strong>Transaction confirmed!</Text>
                  <Text>{`Greetings Counter: ${greetingsCounter}`}</Text>
                </Space>
              }
              description={
                <a href={getTxExplorerURL(sayHelloTxSignature)} target="_blank" rel="noreferrer">View transaction on Solana Explorer</a>
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