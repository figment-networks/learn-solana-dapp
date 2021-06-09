import React from "react";
import styled from "styled-components";
import { Col, Steps, Space } from 'antd';
import { ArrowUpRight } from 'react-feather';
import { STEPS } from "../lib/steps-config";

const { Step } = Steps;

const Sidebar = ({ stepIndex }) => {
  return (
    <Left span={8}>
      <div style={{ marginBottom: "0px", fontSize: "16px", fontWeight: "600", color: "grey" }}>Figment Learn</div>
      <div style={{ marginBottom: "40px", fontSize: "28px", fontWeight: "700" }}>Solana 101 Pathway</div>

      <Steps direction="vertical" size="small" current={stepIndex}>
        {STEPS.map(s => <Step key={s.id} title={s.title} />)}
      </Steps>

      <Footer>
        <Space align="center">
          <a href="https://learn.figment.io/" target="_blank" rel="noreferrer">Learn Web 3 at Figment Learn</a>
          <ArrowUpRight color="white" size="24" />
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
  padding: 20px;
  background-color: black;
  a {
    color: white;
    font-weight: 600;
  }
`;

export default Sidebar