import { PostgresConnectionAdapter } from '../../src/infra/database';

test('Deve criar uma conexão com o banco de dados', async function () {
  const connection = PostgresConnectionAdapter.getInstance();
  const itemsData = await connection.query('SELECT * FROM ccca.item', []);
  expect(itemsData.length).toBe(6);
});
