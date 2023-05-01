import {
  ItemRepository,
  CouponRepository,
  OrderRepository,
} from '../repository';

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createCouponRepository(): CouponRepository;
  createOrderRepository(): OrderRepository;
}
