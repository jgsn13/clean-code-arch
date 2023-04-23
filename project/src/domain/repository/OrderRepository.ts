import Order from '../entity/Order.ts';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  clear(): Promise<void>;
}
