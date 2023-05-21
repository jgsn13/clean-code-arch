type ItemInput = Readonly<{
  idItem: number;
  quantity: number;
}>;

type SimulateFreightInput = Readonly<{
  items: ItemInput[];
}>;

const createSimulateFreightInput = (
  items: ItemInput[],
): SimulateFreightInput => ({ items });

export { SimulateFreightInput, createSimulateFreightInput };
