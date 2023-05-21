interface SimulateFreightOutput {
  amount: number;
}

function createSimulateFreightOutput(amount: number): SimulateFreightOutput {
  return {
    amount,
  };
}

export { SimulateFreightOutput, createSimulateFreightOutput };
