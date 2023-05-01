import pgp from 'pg-promise';
import { Connection } from './';

export default class PostgresConnectionAdapter implements Connection {
  private pgp: any;
  static instance: PostgresConnectionAdapter;

  private constructor() {
    this.pgp = pgp()('postgres://postgres:j123@172.17.0.2:5432/app');
  }

  static getInstance() {
    if (!PostgresConnectionAdapter.instance) {
      PostgresConnectionAdapter.instance = new PostgresConnectionAdapter();
    }
    return PostgresConnectionAdapter.instance;
  }

  async query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
