import React from "react";
import { useParams } from "react-router-dom";

import Solana from "protocols/solana";
import Avalanche from "protocols/avalanche"
import { PROTOCOLS } from "shared/constants";
import { StepType } from "shared/types";

const Protocol = () => {
  const { protocol } = useParams<{ protocol: string }>();

  switch (protocol) {
    case PROTOCOLS.SOLANA.id:
      return <Solana steps={PROTOCOLS.SOLANA.steps as StepType[]} />;
    case PROTOCOLS.AVALANCHE.id:
      return <Avalanche steps={PROTOCOLS.AVALANCHE.steps as StepType[]} />;
    default:
      return <div>Oops</div>;
  }
}

export default Protocol