import { Cpf, createCpf } from './cpf';
import { Coupon, isExpiredCoupon, calculateCouponDiscount } from './coupon';
import { OrderItem, createOrderItem, getOrderItemTotal } from './order-item';
import { OrderCode, createOrderCode } from './order-code';
import { Item } from './item';
import { FreightCalculator } from './freight-calculator';
import { createDefaultFreightCalculator } from './default-freight-calculator';

interface Order {
  cpf: Cpf;
  date: Date;
  freightCalculator: FreightCalculator;
  sequence: number;
  orderItems: OrderItem[];
  freight: number;
  code: OrderCode;
  coupon?: Coupon;
}

function createOrder(
  cpf: string,
  date: Date = new Date(),
  freightCalculator: FreightCalculator = createDefaultFreightCalculator(),
  sequence = 1,
): Order {
  return {
    cpf: createCpf(cpf),
    date,
    freightCalculator,
    sequence,
    orderItems: [],
    freight: 0,
    code: createOrderCode(date, sequence),
  };
}

function addItemInOrder(order: Order, item: Item, quantity: number): Order {
  return {
    ...order,
    freight: order.freight + order.freightCalculator(item) * quantity,
    orderItems: [
      ...order.orderItems,
      createOrderItem(item.idItem, item.price, quantity),
    ],
  };
}

function addCouponInOrder(order: Order, coupon: Coupon): Order {
  return {
    ...order,
    coupon: !isExpiredCoupon(coupon, order.date) ? coupon : undefined,
  };
}

function getOrderFreight(order: Order): number {
  return order.freight;
}

function getOrderCode(order: Order): string {
  return order.code.value;
}

function getOrderCpf(order: Order): string {
  return order.cpf.value;
}

function getOrderItems(order: Order): OrderItem[] {
  return order.orderItems;
}

function getOrderTotal(order: Order): number {
  let total = order.orderItems.reduce(
    (acc, orderItem) => acc + getOrderItemTotal(orderItem),
    0,
  );
  if (order.coupon) total -= calculateCouponDiscount(order.coupon, total);
  total += getOrderFreight(order);
  return total;
}

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
