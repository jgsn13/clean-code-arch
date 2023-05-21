import { Coupon, createCoupon } from '../../../domain/entity/coupon';
import { FindCouponByCode } from '../../../domain/repository/coupon.repository';

const coupons: Readonly<Coupon[]> = [createCoupon('VALE20', 20)];

const createFindCouponByCodeMemory =
  (): FindCouponByCode => async (code: string) =>
    Promise.resolve(coupons.find((coupon) => coupon.code === code));

export { createFindCouponByCodeMemory };
