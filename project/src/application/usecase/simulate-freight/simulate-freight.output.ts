type SimulateFreightOutput = Readonly<{
  amount: number;
}>;

const createSimulateFreightOutput = (
  amount: number,
): SimulateFreightOutput => ({
  amount,
});

export { SimulateFreightOutput, createSimulateFreightOutput };
