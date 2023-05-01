import { Order } from '../../../domain/entity';
import { OrderRepository } from '../../../domain/repository';

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

  clear(): Promise<void> {
    this.orders = [];
    return Promise.resolve();
  }
}
