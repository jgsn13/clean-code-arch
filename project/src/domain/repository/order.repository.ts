import { Order } from '../entity/order';

type SaveOrder = (order: Order) => Promise<void>;
type CountOrders = () => Promise<number>;
type ClearOrders = () => Promise<void>;

export { SaveOrder, CountOrders, ClearOrders };
