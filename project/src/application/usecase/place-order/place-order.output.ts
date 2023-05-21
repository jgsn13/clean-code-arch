type PlaceOrderOutput = Readonly<{
  code: string;
  total: number;
}>;

const createPlaceOrderOutput = (
  code: string,
  total: number,
): PlaceOrderOutput => ({
  code,
  total,
});

export { PlaceOrderOutput, createPlaceOrderOutput };
