import { RepositoryFactory } from '../../domain/factory/repository.factory';
import { getPostgresQuery } from '../database';
import { createFindItemByIdDatabase } from '../repository/database/item-repository-database';
import { createFindCouponByCodeDatabase } from '../repository/database/coupon-repository-database';
import {
  createSaveOrderDatabase,
  createCountOrdersDatabase,
  createClearOrdersDatabase,
} from '../repository/database/order-repository-database';

const createDatabaseRepositoryFactory = function(): RepositoryFactory {
  return function() {
    return {
      createItemRepository: () => ({
        findItemById: createFindItemByIdDatabase(getPostgresQuery()),
      }),
      createCouponRepository: () => ({
        findCouponByCode: createFindCouponByCodeDatabase(getPostgresQuery()),
      }),
      createOrderRepository: () => ({
        saveOrder: createSaveOrderDatabase(getPostgresQuery()),
        countOrders: createCountOrdersDatabase(getPostgresQuery()),
        clearOrders: createClearOrdersDatabase(getPostgresQuery()),
      }),
    };
  };
};

export { createDatabaseRepositoryFactory };
