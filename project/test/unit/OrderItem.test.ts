import { assertEquals } from 'std/testing/asserts.ts';

import OrderItem from '../../src/domain/entity/OrderItem.ts';

Deno.test('Deve criar um item do pedido', function () {
  const orderItem = new OrderItem(1, 1000, 10);
  assertEquals(orderItem.getTotal(), 10000);
});
