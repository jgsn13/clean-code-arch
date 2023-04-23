import Order from 'src/domain/entity/Order.ts';
import CouponRepository from 'src/domain/repository/CouponRepository.ts';
import ItemRepository from 'src/domain/repository/ItemRepository.ts';
import OrderRepository from 'src/domain/repository/OrderRepository.ts';
import PlaceOrderInput from 'src/application/usecase/PlaceOrderInput.ts';
import PlaceOrderOutput from 'src/application/usecase/PlaceOrderOutput.ts';
import DefaultFreightCalculator from 'src/domain/entity/DefaultFreightCalculator.ts';

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
