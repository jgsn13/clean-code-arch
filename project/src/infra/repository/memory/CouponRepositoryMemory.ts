import Coupon from 'src/domain/entity/Coupon.ts';
import CouponRepository from 'src/domain/repository/CouponRepository.ts';

export default class CouponRepositoryMemory implements CouponRepository {
  coupons: Coupon[];

  constructor() {
    this.coupons = [new Coupon('VALE20', 20)];
  }

  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.coupons.find((coupon) => coupon.code === code));
  }
}
