import React, { useState } from "react"
import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { Form, Input, Button, Alert } from 'antd';
import { getNodeURL } from '../lib/utils';

const Transfer = ({ keypair }) => {
  const [error, setError] = useState(null);

  const onFinish = (values) => {
    const url = getNodeURL();
    const connection = new Connection(url);

    const fromPubKey = new PublicKey(values.from);
    const toPubKey = new PublicKey(values.to);

    const signers = [
      {
        publicKey: new PublicKey(values.from),
        secretKey: new Uint8Array(keypair.secretKey)
      }
    ];

    const instructions = SystemProgram.transfer({
      fromPubkey: fromPubKey,
      toPubkey: toPubKey,
      lamports: 100000,  // 10^9 = 1 SOL
    });

    const transaction = new Transaction();
    
    transaction.add(instructions);

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
        setError(err.message)
      })
  };

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
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

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
