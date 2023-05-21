type OrderItemInput = Readonly<{
  idItem: number;
  quantity: number;
}>;

type PlaceOrderInput = Readonly<{
  cpf: string;
  orderItems: OrderItemInput[];
  date: Date;
  coupon?: string;
}>;

const createPlaceOrderInput = (
  cpf: string,
  orderItems: OrderItemInput[],
  date: Date,
  coupon?: string,
): PlaceOrderInput => ({
  cpf,
  orderItems,
  date,
  coupon,
});

export { PlaceOrderInput, createPlaceOrderInput };
