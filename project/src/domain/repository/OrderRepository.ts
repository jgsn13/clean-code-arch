import Order from 'src/domain/entity/Order.ts';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
}
