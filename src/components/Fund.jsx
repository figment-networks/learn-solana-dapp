import React, { useState } from "react";
import { Alert, Button, Space, Col, Input } from 'antd';
import { Connection, PublicKey } from "@solana/web3.js";

const Fund = () => {
  const [isFunded, setIsFunded] = useState(false);
  const [value, setValue] = useState("");

  const fund = () => {
    const url = process.env.REACT_APP_DEVNET_URL;
    const connection = new Connection(url);
    
    // Create a PublicKey address from the input value
    // Call requestAirdrop
    // On success, set isFunded to true
  }
  
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Input placeholder="Enter an address" onChange={(e) => setValue(e.target.value) } style={{ width: "500px" }} />
          <Button type="primary" onClick={fund}>Fund this address</Button>
        </Space>
        {isFunded && <Alert message="Address Funded!" type="success" showIcon />}
      </Space>
    </Col>
  );
}

export default Fund