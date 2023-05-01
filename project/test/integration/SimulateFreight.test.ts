import {
  SimulateFreight,
  SimulateFreightInput,
} from '../../src/application/usecase/simulate_freight';
import { DefaultFreightCalculator } from '../../src/domain/entity';
import { PostgresConnectionAdapter } from '../../src/infra/database';
import { ItemRepositoryDatabase } from '../../src/infra/repository/database';

test('Deve simular o frete dos itens', async function () {
  const connection = PostgresConnectionAdapter.getInstance();
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
  expect(output.amount).toBe(260);
});
