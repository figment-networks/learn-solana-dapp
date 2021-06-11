import React, { useState } from 'react';
import { Alert, Col, Input, Button, Space, Typography } from 'antd';
import { getAccountExplorerURL, getNodeURL } from "../lib/utils";
import { Connection, PublicKey } from "@solana/web3.js";

const { Text } = Typography;

const DECIMAL_OFFSET = 1000000000;

const Balance = () => {
  const [value, setValue] = useState("");
  const [balance, setBalance] = useState(null);

  const getBalance = () => {
    const url = getNodeURL();
    const connection = new Connection(url);
    
    // Create a PublicKey from the input value
    // Call getBalance
    // Set balance using setBalance and DECIMAL_OFFSET
  }

  const explorerUrl = getAccountExplorerURL(value);

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={getBalance}>Check Balance</Button>
        </Space>
        {balance &&
          <Alert
            message={
              <Space>
                <Text strong>Funded!</Text>
                <Text>{`This address has a balance of ◎${balance}`}</Text>
                <a href={explorerUrl} target="_blank" rel="noreferrer" style={{ fontSize: "12px" }}>(view on Solana Explorer)</a>
              </Space>
            }
            type="success"
            showIcon
          />
        }
      </Space>
    </Col>
  );
}

export default Balance