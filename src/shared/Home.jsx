import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from 'antd';
import styled from "styled-components";
import { PROTOCOLS } from "./constants";

const Home = () => {
  return (
    <Container span={12} offset={6} align="center">
      <Title>Figment Learn - All Pathways</Title>
      <ProtocolRow gutter={[16, 24]}>
        {
          Object.keys(PROTOCOLS).map(protocol => {
            const { id, active, logoUrl } = PROTOCOLS[protocol];
            const label = id.charAt(0).toUpperCase() + id.slice(1);

            const box = (
              <ProtocolBox span={6} active={active} >
                <Logo src={logoUrl} />
                <Label>{label}</Label>
              </ProtocolBox>
            );

            return active ? <Link to={`/${id}`}>{box}</Link> : box;
          })
        }
      </ProtocolRow>
    </Container>
  )
}

const Container = styled(Col)`
  margin-top: 60px;
`;

const Title = styled.h1`
  margin-bottom: 40px;
`;

const ProtocolRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
  row-gap: 20px;
`;

const ProtocolBox = styled.div`
  height: 170px;
  border: solid 1px #eee;
  background-color: #f8f8f8;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    border: solid 1px #d5d5d5;
    background-color: #f6f6f6;
    cursor: ${({ active }) => active ? "pointer" : "not-allowed"};
  }
`;

const Logo = styled.img`
  height: 50px;
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

export default Home