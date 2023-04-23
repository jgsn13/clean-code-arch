import DefaultFreightCalculator from '../../../domain/entity/DefaultFreightCalculator.ts';
import Order from '../../../domain/entity/Order.ts';
import CouponRepository from '../../../domain/repository/CouponRepository.ts';
import ItemRepository from '../../../domain/repository/ItemRepository.ts';
import OrderRepository from '../../../domain/repository/OrderRepository.ts';
import PlaceOrderInput from './PlaceOrderInput.ts';
import PlaceOrderOutput from './PlaceOrderOutput.ts';

export default class PlaceOrder {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly orderRepository: OrderRepository,
    readonly couponRepository: CouponRepository,
  ) {}

  async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
    const sequence = (await this.orderRepository.count()) + 1;
    const order = new Order(
      input.cpf,
      input.date,
      new DefaultFreightCalculator(),
      sequence,
    );
    for (const orderItem of input.orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      if (!item) throw new Error('Item not found');
      order.addItem(item, orderItem.quantity);
    }
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      if (coupon) order.addCoupon(coupon);
    }
    await this.orderRepository.save(order);
    const total = order.getTotal();
    const output = new PlaceOrderOutput(order.getCode(), total);
    return output;
  }
}
