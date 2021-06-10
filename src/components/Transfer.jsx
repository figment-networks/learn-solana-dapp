import React, { useState } from "react"
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { Form, Input, Button, Alert, Space, Typography } from 'antd';
import { getNodeURL, getTxExplorerURL } from '../lib/utils';

const { Text } = Typography;

const Transfer = ({ keypair }) => {
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [txSignature, setTxSignature] = useState(null);

  const onFinish = (values) => {
    const url = getNodeURL();
    const connection = new Connection(url);

    const fromPubKey = new PublicKey(values.from);
    const toPubKey = new PublicKey(values.to);

    const signers = [
      {
        publicKey: fromPubKey,
        secretKey: new Uint8Array(keypair.secretKey)
      }
    ];

    const transaction = new Transaction();
    const instructions = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: toPubKey,
      lamports: 100000,  // 10^9 = 1 SOL
    });
    transaction.add(instructions);

    connection
      .sendTransaction(
        transaction,
        signers
      ).then((signature) => {
        console.log("Success ->", signature);
        setTxSignature(signature);
        setFetching(false);
      })
      .catch(e => setError(e.message))
  };

  const explorerUrl = getTxExplorerURL(txSignature);

  return (
    <Form
      name="transfer"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        from: keypair.publicKey.toString()
      }}
      style={{ width: "400px" }}
    > 
      <Form.Item label="Sender" name="from" required>
        <Input disabled />
      </Form.Item>

      <Form.Item label="Amount" name="amount" required tooltip="Enter an amount of SOL tokens">
        <Input prefix="◎" suffix="SOL" style={{ width: "150px" }} />
      </Form.Item>

      <Form.Item label="Recipient" name="to" required>
        <Input placeholder="Enter a valid Solana address" />
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
