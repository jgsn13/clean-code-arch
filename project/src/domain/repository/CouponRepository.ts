import Coupon from '../entity/Coupon.ts';

export default interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}
