interface PlaceOrderOutput {
  code: string;
  total: number;
}

function createPlaceOrderOutput(code: string, total: number): PlaceOrderOutput {
  return {
    code,
    total,
  };
}

export { PlaceOrderOutput, createPlaceOrderOutput };
