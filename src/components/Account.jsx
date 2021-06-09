import React from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import { Keypair } from "@solana/web3.js";

const { Text, Paragraph } = Typography;

const Account = ({ keypair, setKeypair }) => {
  const generateKeypair = () => {
    const keypair = Keypair.generate();
    console.log(keypair);
    console.log(keypair.publicKey.toString());
    setKeypair(keypair);
  }

  return (
    <Col>
      <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>Generate a Keypair</Button>
      {keypair &&
        <Col>
          <Space direction="vertical">
            <Alert
              message="Keypair generated!"
              type="success"
              showIcon
            />
            <Text strong>Public Key:</Text>
            <Paragraph copyable={{ text: keypair.publicKey.toString() }}>
              <Text code>
                {keypair.publicKey.toString()}
              </Text>
            </Paragraph>
          </Space>
        </Col>
      }
    </Col>
  );
}

export default Account