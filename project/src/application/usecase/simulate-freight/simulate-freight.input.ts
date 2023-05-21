interface ItemInput {
  idItem: number;
  quantity: number;
}

interface SimulateFreightInput {
  items: ItemInput[];
}

function createSimulateFreightInput(items: ItemInput[]): SimulateFreightInput {
  return { items };
}

export { SimulateFreightInput, createSimulateFreightInput };
