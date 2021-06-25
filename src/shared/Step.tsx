import React from 'react';
import { Alert, Button, Row, Col, Typography, Space } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { ArrowUpRight } from 'react-feather';

import { StepType } from 'shared/types';

const { Text } = Typography;

const Step = ({
  step,
  isFirstStep,
  isLastStep,
  prev,
  next,
  body,
  nav,
}: {
  step: StepType
  isFirstStep: boolean
  isLastStep: boolean
  prev(): void
  next(): void
  body: JSX.Element
  nav: JSX.Element
}) => {
  return (
    <Right span={16}>
      <Col>
        <StepHeader>
          <Title>{step.title}</Title>
          <Alert
            message={
              <Space>
                <Text strong>Start here!</Text>
                <Space align="center" size="small">
                  <Link><a href={step.url} target="_blank" rel="noreferrer">View step Instructions</a></Link>
                  <ArrowUpRight color="#1890ff" size={18} style={{ marginTop: "6px" }} />
                </Space>
              </Space>
            }
            type="info"
          />
        </StepHeader>

        <StepContent>
          {body}
        </StepContent>

        <StepsNav next={next} prev={prev} isFirstStep={isFirstStep} isLastStep={isLastStep} />

        {nav}
      </Col>
    </Right>
  )
}

const StepsNav = ({
  next,
  prev,
  isFirstStep,
  isLastStep,
}: {
  next(): void
  prev(): void
  isFirstStep: boolean
  isLastStep: boolean
}) => {
  return (
    <StepFooter>
      {!isFirstStep &&
        <PrevButton style={{ marginRight: '8px' }} onClick={() => prev()} icon={<ArrowLeftOutlined />}>
          Previous Step
        </PrevButton>
      }
      {!isLastStep &&
        <NextButton type="primary" onClick={() => next()}>
          <Row align="middle">
            Next Step
            <ArrowRightOutlined size={20} style={{ marginLeft: "6px" }} />
          </Row>
        </NextButton>
      }
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
  margin-bottom: 10px;
`;

const Link = styled.div`
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