import pgp from 'pg-promise';
import { Query } from './connection';

function createQuery(): Query {
  const pgpInstance = pgp()('postgres://postgres:j123@172.17.0.2:5432/app');
  return function(statement: string, params: any[]): Promise<any> {
    return pgpInstance.query(statement, params);
  };
}

const getPostgresQuery = (function() {
  let query: Query | null = null;

  return function(): Query {
    if (!query) {
      query = createQuery();
    }

    return query;
  };
})();

export { getPostgresQuery };
