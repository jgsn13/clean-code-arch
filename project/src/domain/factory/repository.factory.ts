import { FindItemById } from '../repository/item.repository';
import { FindCouponByCode } from '../repository/coupon.repository';
import {
  SaveOrder,
  CountOrders,
  ClearOrders,
} from '../repository/order.repository';

type CreateItemRepository = () => { findItemById: FindItemById };
type CreateCouponRepository = () => { findCouponByCode: FindCouponByCode };
type CreateOrderRepository = () => {
  saveOrder: SaveOrder;
  countOrders: CountOrders;
  clearOrders: ClearOrders;
};
type RepositoryFactory = () => {
  createItemRepository: CreateItemRepository;
  createCouponRepository: CreateCouponRepository;
  createOrderRepository: CreateOrderRepository;
};

export {
  CreateItemRepository,
  CreateCouponRepository,
  CreateOrderRepository,
  RepositoryFactory,
};
