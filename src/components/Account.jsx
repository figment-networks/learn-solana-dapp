import React from 'react';
import { Alert, Button, Col, Space, Typography } from 'antd';
import { Keypair } from "@solana/web3.js";

const { Text, Paragraph } = Typography;

const Account = ({ keypair, setKeypair }) => {
  const generateKeypair = () => {
    // Generate a Keypair
    // Save it to <App />'s state
  }

  // parse the address (as a string) from the keypair object
  const publicKeyStr = "TBD";

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
            <Paragraph copyable={{ text: publicKeyStr }}>
              <Text code>
                {publicKeyStr}
              </Text>
            </Paragraph>
          </Space>
        </Col>
      }
    </Col>
  );
}

export default Account