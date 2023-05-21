interface OrderItem {
  idItem: number;
  price: number;
  quantity: number;
}

function createOrderItem(
  idItem: number,
  price: number,
  quantity: number,
): OrderItem {
  return {
    idItem,
    price,
    quantity,
  };
}

function getOrderItemTotal(orderItem: OrderItem): number {
  return orderItem.price * orderItem.quantity;
}

export { OrderItem, createOrderItem, getOrderItemTotal };
