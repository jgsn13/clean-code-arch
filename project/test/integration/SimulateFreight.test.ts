import { assertEquals } from 'std/testing/asserts.ts';

import SimulateFreight from '../../src/application/usecase/simulate_freight/SimulateFreight.ts';
import SimulateFreightInput from '../../src/application/usecase/simulate_freight/SimulateFreightInput.ts';
import DefaultFreightCalculator from '../../src/domain/entity/DefaultFreightCalculator.ts';
import PostgresConnectionAdapter from '../../src/infra/database/PostgresConnectionAdapter.ts';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase.ts';

Deno.test('Deve simular o frete dos itens', async function () {
  const connection = new PostgresConnectionAdapter();
  const itemRepository = new ItemRepositoryDatabase(connection);
  const freightCalculator = new DefaultFreightCalculator();
  const simulateFreight = new SimulateFreight(
    itemRepository,
    freightCalculator,
  );
  const input = new SimulateFreightInput([
    {
      idItem: 4,
      quantity: 1,
    },
    {
      idItem: 5,
      quantity: 1,
    },
    {
      idItem: 6,
      quantity: 3,
    },
  ]);
  const output = await simulateFreight.execute(input);
  assertEquals(output.amount, 260);
});
