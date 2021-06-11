import React, { useState } from 'react';
import { Row } from 'antd';
import Sidebar from "./components/Sidebar";
import Step from "./components/Step";
import './App.css';

function App() {
  const [stepIndex, setStepIndex] = useState(0);
  const next = () => setStepIndex(stepIndex + 1);
  const prev = () => setStepIndex(stepIndex - 1);

  return (
    <Row>
      <Sidebar stepIndex={stepIndex} />
      <Step stepIndex={stepIndex} prev={prev} next={next} />
    </Row>
  );
}

export default App;
