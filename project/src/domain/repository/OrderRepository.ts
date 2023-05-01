import { Order } from '../entity';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  count(): Promise<number>;
  clear(): Promise<void>;
}
