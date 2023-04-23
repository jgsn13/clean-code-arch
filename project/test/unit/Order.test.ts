import { assertEquals, assertThrows } from 'std/testing/asserts.ts';

import Coupon from '../../src/domain/entity/Coupon.ts';
import DefaultFreightCalculator from '../../src/domain/entity/DefaultFreightCalculator.ts';
import FixedFreightCalculator from '../../src/domain/entity/FixedFreightCalculator.ts';
import Item from '../../src/domain/entity/Item.ts';
import Order from '../../src/domain/entity/Order.ts';

Deno.test('Deve criar um pedido vazio com CPF válido', function () {
  const cpf = '592.794.780-87';
  const order = new Order(cpf);
  const total = order.getTotal();
  assertEquals(total, 0);
});

Deno.test('Deve tentar criar um pedido vazio com CPF inválido', function () {
  const cpf = '111.111.111-11';
  assertThrows(() => new Order(cpf), Error, 'Invalid cpf');
});

Deno.test('Deve criar um pedido com 3 itens', function () {
  const cpf = '592.794.780-87';
  const order = new Order(cpf);
  order.addItem(new Item(1, 'Música', 'CD', 30), 3);
  order.addItem(new Item(2, 'Vídeo', 'DVD', 50), 1);
  order.addItem(new Item(3, 'Vídeo', 'VHS', 10), 2);
  const total = order.getTotal();
  assertEquals(total, 160);
});

Deno.test(
  'Deve criar um pedido com 3 itens com um cupom de desconto',
  function () {
    const cpf = '592.794.780-87';
    const order = new Order(cpf);
    order.addItem(new Item(1, 'Música', 'CD', 30), 3);
    order.addItem(new Item(2, 'Vídeo', 'DVD', 50), 1);
    order.addItem(new Item(3, 'Vídeo', 'VHS', 10), 2);
    order.addCoupon(new Coupon('VALE20', 20));
    const total = order.getTotal();
    assertEquals(total, 128);
  },
);

Deno.test(
  'Deve criar um pedido com 3 itens com um cupom de desconto expirado',
  function () {
    const cpf = '592.794.780-87';
    const order = new Order(cpf, new Date('2023-04-21'));
    order.addItem(new Item(1, 'Música', 'CD', 30), 3);
    order.addItem(new Item(2, 'Vídeo', 'DVD', 50), 1);
    order.addItem(new Item(3, 'Vídeo', 'VHS', 10), 2);
    order.addCoupon(new Coupon('VALE20', 20, new Date('2023-04-20')));
    const total = order.getTotal();
    assertEquals(total, 160);
  },
);

Deno.test(
  'Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia default',
  function () {
    const cpf = '592.794.780-87';
    const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
    order.addItem(
      new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
      1,
    );
    order.addItem(
      new Item(
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
    order.addItem(new Item(3, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    assertEquals(freight, 260);
  },
);

Deno.test(
  'Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia fixo',
  function () {
    const cpf = '592.794.780-87';
    const order = new Order(cpf, new Date(), new FixedFreightCalculator());
    order.addItem(
      new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
      1,
    );
    order.addItem(
      new Item(
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
    order.addItem(new Item(3, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    assertEquals(freight, 50);
  },
);

Deno.test('Deve criar um pedido com código', function () {
  const cpf = '592.794.780-87';
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(
    new Item(1, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
    1,
  );
  order.addItem(
    new Item(2, 'Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20),
    1,
  );
  order.addItem(new Item(3, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9), 3);
  const code = order.getCode();
  assertEquals(code, '202300000001');
});
