import pgp from 'pg-promise';
import { Query } from './connection';

const createQuery = (): Query => {
  const pgpInstance = pgp()('postgres://postgres:j123@172.17.0.2:5432/app');
  return (statement: string, params: any[]) =>
    pgpInstance.query(statement, params);
};

const getPostgresQuery = (() => {
  let query: Query | null = null;

  return () => {
    if (!query) {
      query = createQuery();
    }

    return query;
  };
})();

export { getPostgresQuery };
