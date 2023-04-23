import { assertEquals } from 'std/testing/asserts.ts';

import PlaceOrder from 'src/application/usecase/PlaceOrder.ts';
import CouponRepositoryMemory from 'src/infra/repository/memory/CouponRepositoryMemory.ts';
import ItemRepositoryMemory from 'src/infra/repository/memory/ItemRepositoryMemory.ts';
import OrderRepositoryMemory from 'src/infra/repository/memory/OrderRepositoryMemory.ts';

Deno.test('Deve fazer um pedido', async function () {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository,
  );
  const input = {
    cpf: '592.794.780-87',
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date('2023-04-22'),
    coupon: 'VALE20',
  };
  const output = await placeOrder.execute(input);
  assertEquals(output.total, 88);
});

Deno.test('Deve fazer um pedido com cálculo de frete', async function () {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository,
  );
  const input = {
    cpf: '592.794.780-87',
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date('2023-04-22'),
  };
  const output = await placeOrder.execute(input);
  assertEquals(output.total, 6350);
});

Deno.test('Deve fazer um pedido com código', async function () {
  const itemRepository = new ItemRepositoryMemory();
  const orderRepository = new OrderRepositoryMemory();
  const couponRepository = new CouponRepositoryMemory();
  const placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository,
  );
  const input = {
    cpf: '592.794.780-87',
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date('2023-04-22'),
  };
  const output = await placeOrder.execute(input);
  assertEquals(output.code, '202300000001');
});
