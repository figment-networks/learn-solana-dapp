import React, { useState } from 'react';
import { Button, Row, Col, Typography, Space } from 'antd';
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { ArrowUpRight } from 'react-feather';

import { STEPS } from "../lib/steps-config";
import Balance from "./Balance";
import Account from "./Account";
import Fund from "./Fund";
import Transfer from "./Transfer";
import Connect from "./Connect";
import Deploy from "./Deploy";
import Call from "./Call";

const { Text, Paragraph } = Typography;

const Step = ({ stepIndex, prev, next }) => {
  const [keypair, setKeypair] = useState(null);
  
  const step = STEPS[stepIndex];

  return (
    <Right span={16} key={stepIndex}>
      <Col>
        <StepHeader>
          <Title>{step.title}</Title>
          <Space align="center">
            <Link><a href={step.url} target="_blank" rel="noreferrer">View step Instructions</a></Link>
            <ArrowUpRight color="#1890ff" size="20" style={{ marginTop: "6px" }} />
          </Space>
        </StepHeader>

        <StepContent>
          {step.id === "connect" && <Connect />}
          {step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
          {step.id === "fund" && <Fund />}
          {step.id === "balance" && <Balance />}
          {step.id === "transfer" && <Transfer keypair={keypair} />}
          {step.id === "deploy" && <Deploy />}
          {step.id === "call" && <Call />}
        </StepContent>

        <StepsNav stepIndex={stepIndex} next={next} prev={prev} />

        <Nav keypair={keypair} />
      </Col>
    </Right>
  )
}

const Nav = ({ keypair }) => {
  if (!keypair) return null;

  const publicKey = keypair.publicKey.toString();
  const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: keypair.publicKey.toString() }}>
        <Text code>{publicKeyToDisplay}</Text>
      </Paragraph>
    </div>
  )
}

const StepsNav = ({ stepIndex, next, prev }) => {
  return (
    <StepFooter>
      {stepIndex > 0 && (
        <PrevButton style={{ marginRight: '8px' }} onClick={() => prev()} icon={<ArrowLeftOutlined />}>
          Previous Step
        </PrevButton>
      )}
      {stepIndex < STEPS.length - 1 && (
        <NextButton type="primary" onClick={() => next()}>
          <Row align="middle">
            Next Step
            <ArrowRightOutlined size={20} style={{ marginLeft: "6px" }} />
          </Row>
        </NextButton>
      )}
    </StepFooter>
  )
}

const Right = styled(Col)`
  padding: 60px;
  height: 100vh;
`;

const StepHeader = styled(Col)`
  margin-bottom: 40px;
`;

const StepFooter = styled(Row)`
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const Link = styled.div`
  font-size: 16px;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

const StepContent = styled.div`
  min-height: 250px;
  margin-bottom: 100px;
`;

const NextButton = styled(Button)`
  background: rgb(255,242,155);
  border: solid #888 1px;
  color: #555;

  &:hover {
    background: rgb(255,242,155);
    color: black;
    border: solid black 1px;
  }
`;

const PrevButton = styled(Button)`
  background: white;
  border: solid #888 1px;
  color: #555;

  &:hover {
    color: black;
    border: solid black 1px;
  }
`;

export default Step;