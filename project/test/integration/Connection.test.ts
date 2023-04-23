import { assertEquals } from 'std/testing/asserts.ts';
import PostgresConnectionAdapter from '../../src/infra/database/PostgresConnectionAdapter.ts';

Deno.test('Deve criar uma conexão com o banco de dados', async function () {
  const connection = new PostgresConnectionAdapter();
  const itemsData = await connection.query('SELECT * FROM ccca.item');
  assertEquals(itemsData.length, 6);
});
