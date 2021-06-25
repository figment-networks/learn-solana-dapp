import { useEffect, useState } from 'react';
import { getNodeRpcURL } from "../utils";
import { Alert, Col, Space, Typography } from "antd";
import { Connection } from "@solana/web3.js";

const { Text } = Typography;

const Connect = () => {
  const [version, setVersion] = useState(null);

  useEffect(() => {
    getConnection();
  }, []);

  const getConnection = () => {
    const url = getNodeRpcURL();
  
    // Create a connection
    const connection = new Connection(url);
  
    // Get the API version
    connection.getVersion()
      .then(version => {
        // and save it to the component's state  
        setVersion(version);
      })
      .catch(error => console.log(error))
  }

  return (
    <Col style={{ width: "100%" }}>
      {version
        ? <Alert
        message={
          <Space>
            Connected to Solana
            <Text code>v{version["solana-core"]}</Text>
          </Space>
        }
        type="success"
        showIcon
      /> : <Alert message="Not connected to Solana" type="error" showIcon />}
    </Col>
  );
}

export default Connect