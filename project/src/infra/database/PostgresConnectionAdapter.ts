import Connection from 'src/infra/database/Connection.ts';
import { Client } from 'postgres';

export default class PostgresConnectionAdapter implements Connection {
  client: Client;

  constructor() {
    this.client = new Client('postgres://postgres:j123@172.17.0.2:5432/app');
  }

  async query(statement: string): Promise<any> {
    await this.client.connect();
    const result = await this.client.queryObject(statement);
    await this.client.end();
    return result.rows;
  }
}
