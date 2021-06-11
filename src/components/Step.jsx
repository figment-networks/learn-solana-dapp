import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { STEPS } from "../lib/steps-config";
import Balance from "./Balance";
import Account from "./Account";
import Fund from "./Fund";
import Transfer from "./Transfer";
import Connect from "./Connect";

const Step = ({ stepIndex, prev, next }) => {
  const [keypair, setKeypair] = useState(null);
  
  const step = STEPS[stepIndex];

  return (
    <Right span={16} key={stepIndex}>
      <Col>
        <StepHeader>
          <Title>{step.title}</Title>
          <Description>{step.description}</Description>
          <Reference><a href={step.metadata} target="_blank" rel="noreferrer">{step.metadata}</a></Reference>
        </StepHeader>

        <StepContent>
          {step.id === "connect" && <Connect />}
          {step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
          {step.id === "fund" && <Fund />}
          {step.id === "balance" && <Balance />}
          {step.id === "transfer" && <Transfer keypair={keypair} />}
        </StepContent>

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
      </Col>
    </Right>
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

const Description = styled.div`
  font-size: 18px;
  color: #aaa;
`;

const Reference = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

const StepContent = styled.div`
  min-height: 250px;
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