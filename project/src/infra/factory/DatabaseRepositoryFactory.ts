import { RepositoryFactory } from '../../domain/factory';
import {
  ItemRepository,
  CouponRepository,
  OrderRepository,
} from '../../domain/repository';
import { PostgresConnectionAdapter } from '../database';
import {
  ItemRepositoryDatabase,
  CouponRepositoryDatabase,
  OrderRepositoryDatabase,
} from '../repository/database';

export default class DatabaseRepositoryFactory implements RepositoryFactory {
  createItemRepository(): ItemRepository {
    return new ItemRepositoryDatabase(PostgresConnectionAdapter.getInstance());
  }

  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(
      PostgresConnectionAdapter.getInstance(),
    );
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(PostgresConnectionAdapter.getInstance());
  }
}
