import Coupon from 'src/domain/entity/Coupon.ts';

export default interface CouponRepository {
  findByCode(code: string): Promise<Coupon | undefined>;
}
