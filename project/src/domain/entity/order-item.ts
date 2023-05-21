type OrderItem = Readonly<{
  idItem: number;
  price: number;
  quantity: number;
}>;

const createOrderItem = (
  idItem: number,
  price: number,
  quantity: number,
): OrderItem => ({
  idItem,
  price,
  quantity,
});

const getOrderItemTotal = (orderItem: OrderItem): number =>
  orderItem.price * orderItem.quantity;

export { OrderItem, createOrderItem, getOrderItemTotal };
