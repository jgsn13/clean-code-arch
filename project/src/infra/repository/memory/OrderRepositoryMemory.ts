import Order from 'src/domain/entity/Order.ts';
import OrderRepository from 'src/domain/repository/OrderRepository.ts';

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];

  constructor() {
    this.orders = [];
  }

  save(order: Order): Promise<void> {
    this.orders.push(order);
    return Promise.resolve();
  }

  count(): Promise<number> {
    return Promise.resolve(this.orders.length);
  }
}
