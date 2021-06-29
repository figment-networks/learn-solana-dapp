/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-throw-literal */
// Load environment variables
import dotenv from 'dotenv'
import {getNodeRpcURL} from './utils'
dotenv.config({ "path": '../../.env.local'})


// Load Avalanche SDK components
const { Avalanche } = require("avalanche")

if (!process.env.REACT_APP_AVALANCHE_RPC_URL) throw "RPC_URL env var is not set!"
if (!process.env.REACT_APP_AVALANCHE_API_KEY) throw "NODE_API_KEY env var is not set!"

// Configure Avalanche client from the DataHub url
const url = new URL(getNodeRpcURL())
const client = new Avalanche(
  url.hostname,
  url.port,
  url.protocol.replace(":", ""),
  parseInt(process.env.NETWORK_ID),
  "X",
  "C",
  process.env.NETWORK_NAME
)

// Apply DataHub API authentication token
client.setAuthToken(process.env.NODE_API_KEY)
const _client = client
export default { client }