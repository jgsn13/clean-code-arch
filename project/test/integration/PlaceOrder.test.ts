import { assertEquals } from 'std/testing/asserts.ts';

import PlaceOrder from '../../src/application/usecase/place_order/PlaceOrder.ts';
import PostgresConnectionAdapter from '../../src/infra/database/PostgresConnectionAdapter.ts';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase.ts';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase.ts';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase.ts';

let placeOrder: PlaceOrder;
let orderRepository: OrderRepositoryDatabase;

function beforeEach() {
  const connection = new PostgresConnectionAdapter();
  const itemRepository = new ItemRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
  const couponRepository = new CouponRepositoryDatabase(connection);
  placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    couponRepository,
  );
}

function test(name: string, fn: () => Promise<void>) {
  Deno.test({
    name,
    async fn() {
      beforeEach();
      await fn();
      await afterEach();
    },
  });
}

test('Deve fazer um pedido', async function () {
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
  assertEquals(output.total, 138);
});

test('Deve fazer um pedido com cálculo de frete', async function () {
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

test('Deve fazer um pedido com código', async function () {
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

async function afterEach() {
  await orderRepository.clear();
}
