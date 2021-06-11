import React, { useState } from "react"
import { Connection, PublicKey, SystemProgram, Transaction, Keypair } from "@solana/web3.js";
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { getNodeURL, getTxExplorerURL } from '../lib/utils';

const { Text } = Typography;

const Transfer = ({ keypair }) => {
  const [toAddress, setToAddress] = useState(null);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [txSignature, setTxSignature] = useState(null);

  const generate = () => {
    const keypair = Keypair.generate();
    const address = keypair.publicKey.toString();
    setToAddress(address);

    console.log(`address`, address);
  }

  const transfer = (values) => {
    const amountNumber = parseFloat(values.amount);
  
    if (isNaN(amountNumber)) {
      setError("Amount needs to be a valid number")
    }
  
    const url = getNodeURL();
    const connection = new Connection(url);
  
    const fromPubKey = new PublicKey(values.from);
    const toPubKey = new PublicKey(toAddress);
  
    const signers = [
      {
        publicKey: fromPubKey,
        secretKey: new Uint8Array(keypair.secretKey)
      }
    ];
  
    const instructions = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: toPubKey,
      lamports: amountNumber,
    });
    
    // Create a transaction
    // Add instructions
    // Call sendTransaction
    // On success, call setTxSignature and setFetching
  };

  const explorerUrl = getTxExplorerURL(txSignature);

  return (
    <Form
      name="transfer"
      layout="vertical"
      onFinish={transfer}
      initialValues={{
        from: keypair.publicKey.toString()
      }}
      style={{ width: "400px" }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Input disabled />
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="Enter an amount of SOL tokens">
        <Space direction="vertical">
          <Input suffix="lamports" style={{ width: "200px" }} />
          <Text type="secondary">(1 lamport = 0.000000001 SOL)</Text>
        </Space>
      </Form.Item>

      <Form.Item>
        <Space direction="horizontal">
          {toAddress && <Text code>{toAddress}</Text>}
          <Button onClick={generate}>Generate an address</Button>
        </Space>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={fetching}>
          Submit
        </Button>
      </Form.Item>

      {fetching && "Sending transaction..."}

      {txSignature &&
        <Alert
          type="success"
          showIcon
          message={
            <Space>
              <Text strong>Transfer succeeded!</Text>
              <a href={explorerUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px" }}>(view on Solana Explorer)</a>
            </Space>
          }
        />
      }
      
      {error &&
        <Alert
          type="error"
          showIcon
          closable
          message={error}
          onClose={() => setError(null)}
        />
      }
    </Form>
  );
};

export default Transfer


// CLI https://docs.solana.com/cli/transfer-tokens#transfer-tokens-from-your-first-wallet-to-the-second-address

// Random example code from Google https://githubmemory.com/repo/1Crazymoney/math-solana-js
// web3.js docs https://solana-labs.github.io/solana-web3.js/modules.html#sendandconfirmtransaction

// SEE lib/transfer.js for working code
