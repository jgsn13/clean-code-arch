import { getPostgresQuery } from '../../src/infra/database';

test('Deve criar uma conexão com o banco de dados', async function() {
  const query = getPostgresQuery();
  const itemsData = await query('SELECT * FROM ccca.item', []);
  expect(itemsData.length).toBe(6);
});
