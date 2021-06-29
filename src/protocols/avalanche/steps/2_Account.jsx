import { Alert, Button, Col, Space, Typography } from 'antd';
import { Avalanche } from "avalanche";
import fs from 'fs';
import { getNodeRpcURL } from "../utils";

// import client from "../client"
const { Text } = Typography;

const Account = ({ keypair, setKeypair }) => {

  const url = new URL(getNodeRpcURL())
  const client = new Avalanche(url)

  // Apply DataHub API authentication token
  client.setAuthToken(process.env.REACT_APP_AVALANCHE_API_KEY)

  // Path where we will keep the credentials for the pathway
  const credentialsPath = "../credentials"
  const chain = client.XChain()
  const keyChain = chain.keyChain()
  const keyPath = `${credentialsPath}/keypair.json`

  const generateKeypair = () => {
    // const keypair = Keypair.generate();
    const key = keyChain.makeKey()
    const keypair = key.getPublicKeyString 

    console.log(keypair)
    setKeypair(keypair);
  }

  // parse the address (as a string) from the keypair object
  const publicKeyStr = keypair && keypair;

  return (<>
    <Col>
      <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>Generate a Keypair</Button>
      {keypair &&
        <Col>
          <Space direction="vertical">
            <Alert
              message={
                <Space>
                  <Text strong>Keypair generated!</Text>
                </Space>
              }
              description={
                <div>
                  <Text>Open the JS console to inspect the Keypair.</Text>
                  <div>
                    This is the string representation of the public key
                    <Text code>{publicKeyStr}</Text>.
                  </div>
                  <Text>It's accessible (and copyable) at the top right of this page.</Text>
                </div>
              }
              type="success"
              showIcon
            />
          </Space>
        </Col>
      }
    </Col>
  </>);
}

export default Account