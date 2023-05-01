import {
  Coupon,
  Cpf,
  DefaultFreightCalculator,
  FreightCalculator,
  Item,
  OrderCode,
  OrderItem,
} from './';

export default class Order {
  cpf: Cpf;
  private orderItems: OrderItem[];
  coupon?: Coupon;
  private freight: number;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1,
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.code = new OrderCode(date, sequence);
  }

  addItem(item: Item, quantity: number) {
    this.freight += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return;
    this.coupon = coupon;
  }

  getFreight() {
    return this.freight;
  }

  getCode() {
    return this.code.value;
  }

  getCpf() {
    return this.cpf.value;
  }

  getOrderItems() {
    return this.orderItems;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total);
    }
    total += this.getFreight();
    return total;
  }
}
