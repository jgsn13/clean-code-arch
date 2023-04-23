import { Client } from 'postgres';
import Connection from './Connection.ts';

export default class PostgresConnectionAdapter implements Connection {
  private client: Client;
  static instance: PostgresConnectionAdapter;

  private constructor() {
    this.client = new Client('postgres://postgres:j123@172.17.0.2:5432/app');
  }

  static getInstance() {
    if (!PostgresConnectionAdapter.instance) {
      PostgresConnectionAdapter.instance = new PostgresConnectionAdapter();
    }
    return PostgresConnectionAdapter.instance;
  }

  async query(statement: string): Promise<any> {
    await this.client.connect();
    const result = await this.client.queryObject(statement);
    await this.client.end();
    return result.rows;
  }
}
