interface OrderItemInput {
  idItem: number;
  quantity: number;
}

interface PlaceOrderInput {
  cpf: string;
  orderItems: OrderItemInput[];
  date: Date;
  coupon?: string;
}

function createPlaceOrderInput(
  cpf: string,
  orderItems: OrderItemInput[],
  date: Date,
  coupon?: string,
): PlaceOrderInput {
  return {
    cpf,
    orderItems,
    date,
    coupon,
  };
}

export { PlaceOrderInput, createPlaceOrderInput };
