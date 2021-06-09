import { Row, Col } from 'antd';

const Send = () => {
  return (
    <Row align="middle">
      <Col span={24}>
        Send tokens from one account to another
      </Col>
    </Row>
  );
}

// CLI https://docs.solana.com/cli/transfer-tokens#transfer-tokens-from-your-first-wallet-to-the-second-address

// Random example code from Google https://githubmemory.com/repo/1Crazymoney/math-solana-js
// web3.js docs https://solana-labs.github.io/solana-web3.js/modules.html#sendandconfirmtransaction

// SEE lib/transfer.js for working code

export default Send