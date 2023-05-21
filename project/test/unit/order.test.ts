import {
  createOrder,
  getOrderTotal,
  addItemInOrder,
  addCouponInOrder,
  getOrderFreight,
  getOrderCode,
} from '../../src/domain/entity/order';
import { createItem } from '../../src/domain/entity/item';
import { createCoupon } from '../../src/domain/entity/coupon';
import { createDefaultFreightCalculator } from '../../src/domain/entity/default-freight-calculator';
import { createFixedFreightCalculator } from '../../src/domain/entity/fixed-freight-calculator';

test('Deve criar um pedido vazio com CPF válido', () => {
  const cpf = '592.794.780-87';
  const order = createOrder(cpf);
  const total = getOrderTotal(order);
  expect(total).toBe(0);
});

test('Deve tentar criar um pedido vazio com CPF inválido', () => {
  const cpf = '111.111.111-11';
  expect(() => createOrder(cpf)).toThrow(new Error('Invalid cpf'));
});

test('Deve criar um pedido com 3 itens', () => {
  const cpf = '592.794.780-87';
  let order = createOrder(cpf);
  order = addItemInOrder(order, createItem(1, 'Música', 'CD', 30), 3);
  order = addItemInOrder(order, createItem(2, 'Vídeo', 'DVD', 50), 1);
  order = addItemInOrder(order, createItem(3, 'Vídeo', 'VHS', 10), 2);
  const total = getOrderTotal(order);
  expect(total).toBe(160);
});

test('Deve criar um pedido com 3 itens com um cupom de desconto', () => {
  const cpf = '592.794.780-87';
  let order = createOrder(cpf);
  order = addItemInOrder(order, createItem(1, 'Música', 'CD', 30), 3);
  order = addItemInOrder(order, createItem(2, 'Vídeo', 'DVD', 50), 1);
  order = addItemInOrder(order, createItem(3, 'Vídeo', 'VHS', 10), 2);
  order = addCouponInOrder(order, createCoupon('VALE20', 20));
  const total = getOrderTotal(order);
  expect(total).toBe(128);
});

test('Deve criar um pedido com 3 itens com um cupom de desconto expirado', () => {
  const cpf = '592.794.780-87';
  let order = createOrder(cpf, new Date('2023-04-21'));
  order = addItemInOrder(order, createItem(1, 'Música', 'CD', 30), 3);
  order = addItemInOrder(order, createItem(2, 'Vídeo', 'DVD', 50), 1);
  order = addItemInOrder(order, createItem(3, 'Vídeo', 'VHS', 10), 2);
  order = addCouponInOrder(
    order,
    createCoupon('VALE20', 20, new Date('2023-04-20')),
  );
  const total = getOrderTotal(order);
  expect(total).toBe(160);
});

test('Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia default', () => {
  const cpf = '592.794.780-87';
  let order = createOrder(cpf, new Date(), createDefaultFreightCalculator());
  order = addItemInOrder(
    order,
    createItem(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
    1,
  );
  order = addItemInOrder(
    order,
    createItem(
      2,
      'Instrumentos Musicais',
      'Amplificador',
      5000,
      100,
      50,
      50,
      20,
    ),
    1,
  );
  order = addItemInOrder(
    order,
    createItem(3, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9),
    3,
  );
  const freight = getOrderFreight(order);
  expect(freight).toBe(260);
});

test('Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia fixo', () => {
  const cpf = '592.794.780-87';
  let order = createOrder(cpf, new Date(), createFixedFreightCalculator());
  order = addItemInOrder(
    order,
    createItem(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
    1,
  );
  order = addItemInOrder(
    order,
    createItem(
      2,
      'Instrumentos Musicais',
      'Amplificador',
      5000,
      100,
      50,
      50,
      20,
    ),
    1,
  );
  order = addItemInOrder(
    order,
    createItem(3, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9),
    3,
  );
  const freight = getOrderFreight(order);
  expect(freight).toBe(50);
});

test('Deve criar um pedido com código', () => {
  const cpf = '592.794.780-87';
  let order = createOrder(cpf, new Date(), createFixedFreightCalculator());
  order = addItemInOrder(
    order,
    createItem(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
    1,
  );
  order = addItemInOrder(
    order,
    createItem(
      2,
      'Instrumentos Musicais',
      'Amplificador',
      5000,
      100,
      50,
      50,
      20,
    ),
    1,
  );
  order = addItemInOrder(
    order,
    createItem(3, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9),
    3,
  );
  const code = getOrderCode(order);
  expect(code).toBe('202300000001');
});
