import { FindItemById } from '../repository/item.repository';
import { FindCouponByCode } from '../repository/coupon.repository';
import {
  SaveOrder,
  CountOrders,
  ClearOrders,
} from '../repository/order.repository';

type CreateItemRepository = () => Readonly<{ findItemById: FindItemById }>;
type CreateCouponRepository = () => Readonly<{
  findCouponByCode: FindCouponByCode;
}>;
type CreateOrderRepository = () => Readonly<{
  saveOrder: SaveOrder;
  countOrders: CountOrders;
  clearOrders: ClearOrders;
}>;
type RepositoryFactory = () => Readonly<{
  createItemRepository: CreateItemRepository;
  createCouponRepository: CreateCouponRepository;
  createOrderRepository: CreateOrderRepository;
}>;

export {
  CreateItemRepository,
  CreateCouponRepository,
  CreateOrderRepository,
  RepositoryFactory,
};
