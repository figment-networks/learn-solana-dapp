import React from "react";
import styled from "styled-components";
import { Col, Steps, Space } from 'antd';
import { ArrowLeft } from 'react-feather';
import { Link } from "react-router-dom";

import { StepType } from "shared/types";

const { Step } = Steps;

const Sidebar = ({
  steps,
  stepIndex
}: {
  steps: StepType[]
  stepIndex: number
}) => {
  return (
    <Left span={8}>
      <div style={{ marginBottom: "0px", fontSize: "16px", fontWeight: 600, color: "grey" }}>Figment Learn</div>
      <div style={{ marginBottom: "40px", fontSize: "28px", fontWeight: 700 }}>Solana Pathway</div>

      <Steps direction="vertical" size="small" current={stepIndex}>
        {steps.map((s: StepType) => <Step key={s.id} title={s.title} />)}
      </Steps>

      <Footer>
        <Space align="center">
          <ArrowLeft size={20} style={{ marginTop: "7px" }} />
          <Link to="/">See All Pathways</Link>
        </Space>
      </Footer>
    </Left>
  )
}

const Left = styled(Col)`
  background: rgb(255, 242, 155);
  padding: 40px 0 0 40px;
  height: 100vh;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0 20px 35px;

  a {
    color: black;
    font-size: 15px;
    font-weight: 600;
  }
`;

export default Sidebar