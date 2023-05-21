import { RepositoryFactory } from '../../domain/factory/repository.factory';
import { createFindItemByIdMemory } from '../repository/memory/item-repository-memory';
import { createFindCouponByCodeMemory } from '../repository/memory/coupon-repository-memory';
import {
  createSaveOrderMemory,
  createCountOrdersMemory,
  createClearOrdersMemory,
} from '../repository/memory/order-repository-memory';

const createMemoryRepositoryFactory = (): RepositoryFactory => () => ({
  createItemRepository: () => ({
    findItemById: createFindItemByIdMemory(),
  }),
  createCouponRepository: () => ({
    findCouponByCode: createFindCouponByCodeMemory(),
  }),
  createOrderRepository: () => ({
    saveOrder: createSaveOrderMemory(),
    countOrders: createCountOrdersMemory(),
    clearOrders: createClearOrdersMemory(),
  }),
});

export { createMemoryRepositoryFactory };
