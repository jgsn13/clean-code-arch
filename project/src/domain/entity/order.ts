import { Cpf, createCpf } from './cpf';
import { Coupon, isExpiredCoupon, calculateCouponDiscount } from './coupon';
import { OrderItem, createOrderItem, getOrderItemTotal } from './order-item';
import { OrderCode, createOrderCode } from './order-code';
import { Item } from './item';
import { FreightCalculator } from './freight-calculator';
import { createDefaultFreightCalculator } from './default-freight-calculator';

type Order = Readonly<{
  cpf: Cpf;
  date: Date;
  freightCalculator: FreightCalculator;
  sequence: number;
  orderItems: OrderItem[];
  freight: number;
  code: OrderCode;
  coupon?: Coupon;
}>;

const createOrder = (
  cpf: string,
  date: Date = new Date(),
  freightCalculator: FreightCalculator = createDefaultFreightCalculator(),
  sequence = 1,
): Order => ({
  cpf: createCpf(cpf),
  date,
  freightCalculator,
  sequence,
  orderItems: [],
  freight: 0,
  code: createOrderCode(date, sequence),
});

const addItemInOrder = (order: Order, item: Item, quantity: number): Order => ({
  ...order,
  freight: order.freight + order.freightCalculator(item) * quantity,
  orderItems: [
    ...order.orderItems,
    createOrderItem(item.idItem, item.price, quantity),
  ],
});

const addCouponInOrder = (order: Order, coupon: Coupon): Order => ({
  ...order,
  coupon: !isExpiredCoupon(coupon, order.date) ? coupon : undefined,
});

const getOrderFreight = (order: Order): number => order.freight;

const getOrderCode = (order: Order): string => order.code.value;

const getOrderCpf = (order: Order): string => order.cpf.value;

const getOrderItems = (order: Order): OrderItem[] => order.orderItems;

const getOrderTotal = (order: Order): number => {
  let total = order.orderItems.reduce(
    (acc, orderItem) => acc + getOrderItemTotal(orderItem),
    0,
  );
  if (order.coupon) total -= calculateCouponDiscount(order.coupon, total);
  total += getOrderFreight(order);
  return total;
};

export {
  Order,
  createOrder,
  addItemInOrder,
  addCouponInOrder,
  getOrderFreight,
  getOrderCode,
  getOrderCpf,
  getOrderItems,
  getOrderTotal,
};
