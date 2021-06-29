import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "shared/Sidebar";
import { StepType } from "shared/types";
import Step from "../../shared/Step";

import Connect  from "./steps/1_Connect";
import Account  from "./steps/2_Account";
import Query    from "./steps/3_Query";
import Balance  from "./steps/4_Balance";
import Transfer from "./steps/5_Transfer";
import Deploy   from "./steps/6_Deploy";
import Call     from "./steps/7_Call";

const { Text, Paragraph } = Typography;

const Avalan = ({
  steps
}: {
  steps: StepType[]
}) => {
  const [keypair, setKeypair] = useState(null);

  // TODO: Extract in custom hook useSteps
  const [stepIndex, setStepIndex] = useState(0);
  const next = () => setStepIndex(stepIndex + 1);
  const prev = () => setStepIndex(stepIndex - 1);  
  const step = steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  return (
    <Row>
      <Sidebar
        steps={steps}
        stepIndex={stepIndex}
      />
      <Step
        step={step}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        prev={prev}
        next={next}
        body={
          <>
            {step.id === "connect" && <Connect />}
            {step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
            {step.id === "fund" && <Query />}
            {step.id === "balance" && <Balance />}
            {step.id === "transfer" && <Transfer keypair={keypair} />}
            {step.id === "deploy" && <Deploy />}
            {step.id === "call" && <Call />}
          </>
        }
        nav={<Nav keypair={keypair} />}
      />
    </Row>
  );
}

const Nav = ({ keypair }) => {
  if (!keypair) return null;

  console.log(keypair)

  const publicKey = keypair;
  const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: keypair }}>
        <Text code>{publicKeyToDisplay}</Text>
      </Paragraph>
    </div>
  )
}

export default Avalan
