import { Order } from '../../../domain/entity/order';
import {
  SaveOrder,
  CountOrders,
  ClearOrders,
} from '../../../domain/repository/order.repository';

let orders: Readonly<Order[]> = [];

const createSaveOrderMemory = (): SaveOrder => async (order: Order) => {
  orders = [...orders, order];
};

const createCountOrdersMemory = (): CountOrders => async () => orders.length;

const createClearOrdersMemory = (): ClearOrders => async () => {
  orders = [];
};

export {
  createSaveOrderMemory,
  createCountOrdersMemory,
  createClearOrdersMemory,
};
