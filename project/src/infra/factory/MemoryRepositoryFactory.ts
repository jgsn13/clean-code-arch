import { RepositoryFactory } from '../../domain/factory';
import {
  ItemRepository,
  CouponRepository,
  OrderRepository,
} from '../../domain/repository';
import {
  CouponRepositoryMemory,
  ItemRepositoryMemory,
  OrderRepositoryMemory,
} from '../repository/memory';

export default class MemoryRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMemory();
  }
}
