import { Coupon } from '../entity/coupon';

type FindCouponByCode = (code: string) => Promise<Coupon | undefined>;

export { FindCouponByCode };
