import {
  PlaceOrder,
  createPlaceOrder,
} from '../../src/application/usecase/place-order';
import { getPostgresQuery } from '../../src/infra/database';
import { createDatabaseRepositoryFactory } from '../../src/infra/factory';
import { ClearOrders } from '../../src/domain/repository/order.repository';
import { createClearOrdersDatabase } from '../../src/infra/repository/database/order-repository-database';

let placeOrder: PlaceOrder;
let clearOrders: ClearOrders;

beforeEach(function() {
  const query = getPostgresQuery();
  clearOrders = createClearOrdersDatabase(query);
  const repositoryFactory = createDatabaseRepositoryFactory();
  // const repositoryFactory = createMemoryRepositoryFactory();
  placeOrder = createPlaceOrder(repositoryFactory);
});

test('Deve fazer um pedido', async function() {
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
  const output = await placeOrder(input);
  expect(output.total).toBe(138);
});

test('Deve fazer um pedido com cálculo de frete', async function() {
  const input = {
    cpf: '592.794.780-87',
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date('2023-04-22'),
  };
  const output = await placeOrder(input);
  expect(output.total).toBe(6350);
});

test('Deve fazer um pedido com código', async function() {
  const input = {
    cpf: '592.794.780-87',
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date('2023-04-22'),
  };
  const output = await placeOrder(input);
  expect(output.code).toBe('202300000001');
});

afterEach(async function() {
  await clearOrders();
});
