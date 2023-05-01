import { Coupon } from '../entity';

export default interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}
