import { DefaultFreightCalculator, Order } from '../../../domain/entity';
import { RepositoryFactory } from '../../../domain/factory';
import {
  CouponRepository,
  ItemRepository,
  OrderRepository,
} from '../../../domain/repository';
import { PlaceOrderInput, PlaceOrderOutput } from './';

export default class PlaceOrder {
  private readonly itemRepository: ItemRepository;
  private readonly couponRepository: CouponRepository;
  private readonly orderRepository: OrderRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.itemRepository = repositoryFactory.createItemRepository();
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

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
