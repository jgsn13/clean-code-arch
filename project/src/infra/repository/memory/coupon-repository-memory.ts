import { Coupon, createCoupon } from '../../../domain/entity/coupon';
import { FindCouponByCode } from '../../../domain/repository/coupon.repository';

const coupons: Coupon[] = [createCoupon('VALE20', 20)];

const createFindCouponByCodeMemory = function(): FindCouponByCode {
  return async function(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(coupons.find((coupon) => coupon.code === code));
  };
};

export { createFindCouponByCodeMemory };
