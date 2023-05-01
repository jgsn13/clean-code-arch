import { PlaceOrder } from '../../src/application/usecase/place_order';
import { PostgresConnectionAdapter } from '../../src/infra/database';
import { DatabaseRepositoryFactory } from '../../src/infra/factory';
import { OrderRepositoryDatabase } from '../../src/infra/repository/database';

let placeOrder: PlaceOrder;
let orderRepository: OrderRepositoryDatabase;

beforeEach(function () {
  const connection = PostgresConnectionAdapter.getInstance();
  orderRepository = new OrderRepositoryDatabase(connection);
  const repositoryFactory = new DatabaseRepositoryFactory();
  // const repositoryFactory = new MemoryRepositoryFactory();
  placeOrder = new PlaceOrder(repositoryFactory);
});

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
  expect(output.total).toBe(138);
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
  expect(output.total).toBe(6350);
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
  expect(output.code).toBe('202300000001');
});

afterEach(async function () {
  await orderRepository.clear();
});
