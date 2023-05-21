import {
  createOrderItem,
  getOrderItemTotal,
} from '../../src/domain/entity/order-item';

test('Deve criar um item do pedido', function() {
  const orderItem = createOrderItem(1, 1000, 10);
  expect(getOrderItemTotal(orderItem)).toBe(10000);
});
