import {
  createOrder,
  addItemInOrder,
  addCouponInOrder,
  getOrderTotal,
  getOrderCode,
} from '../../../domain/entity/order';
import { RepositoryFactory } from '../../../domain/factory/repository.factory';
import { PlaceOrderInput } from './place-order.input';
import { PlaceOrderOutput, createPlaceOrderOutput } from './place-order.output';
import { createDefaultFreightCalculator } from '../../../domain/entity/default-freight-calculator';

type PlaceOrder = (input: PlaceOrderInput) => Promise<PlaceOrderOutput>;

const createPlaceOrder = function(
  repositoryFactory: RepositoryFactory,
): PlaceOrder {
  return async function placeOrder(input: PlaceOrderInput) {
    const {
      createOrderRepository,
      createItemRepository,
      createCouponRepository,
    } = repositoryFactory();
    const { countOrders, saveOrder } = createOrderRepository();
    const { findItemById } = createItemRepository();
    const { findCouponByCode } = createCouponRepository();

    const sequence = (await countOrders()) + 1;
    let order = createOrder(
      input.cpf,
      input.date,
      createDefaultFreightCalculator(),
      sequence,
    );
    await Promise.all(
      input.orderItems.map(async (orderItem) => {
        const item = await findItemById(orderItem.idItem);
        if (!item) throw new Error('Item not found');
        order = addItemInOrder(order, item, orderItem.quantity);
      }),
    );
    if (input.coupon) {
      const coupon = await findCouponByCode(input.coupon);
      if (coupon) {
        order = addCouponInOrder(order, coupon);
      }
    }
    await saveOrder(order);
    const total = getOrderTotal(order);
    const output = createPlaceOrderOutput(getOrderCode(order), total);
    return output;
  };
};

export { PlaceOrder, createPlaceOrder };
