import {
  createSimulateFreight,
  createSimulateFreightInput,
} from '../../src/application/usecase/simulate-freight';
import { createDefaultFreightCalculator } from '../../src/domain/entity/default-freight-calculator';
import { getPostgresQuery } from '../../src/infra/database';
import { createFindItemByIdDatabase } from '../../src/infra/repository/database/item-repository-database';

test('Deve simular o frete dos itens', async () => {
  const query = getPostgresQuery();
  const findItemById = createFindItemByIdDatabase(query);
  const freightCalculator = createDefaultFreightCalculator();
  const simulateFreight = createSimulateFreight(
    findItemById,
    freightCalculator,
  );
  const input = createSimulateFreightInput([
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
  const output = await simulateFreight(input);
  expect(output.amount).toBe(260);
});
