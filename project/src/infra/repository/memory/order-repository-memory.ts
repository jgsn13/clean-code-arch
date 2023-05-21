import { Order } from '../../../domain/entity/order';
import {
  SaveOrder,
  CountOrders,
  ClearOrders,
} from '../../../domain/repository/order.repository';

let orders: Order[] = [];

const createSaveOrderMemory = function(): SaveOrder {
  return async function(order: Order): Promise<void> {
    orders.push(order);
    return Promise.resolve();
  };
};

const createCountOrdersMemory = function(): CountOrders {
  return async function(): Promise<number> {
    return Promise.resolve(orders.length);
  };
};

const createClearOrdersMemory = function(): ClearOrders {
  return async function(): Promise<void> {
    orders = [];
    return Promise.resolve();
  };
};

export {
  createSaveOrderMemory,
  createCountOrdersMemory,
  createClearOrdersMemory,
};
