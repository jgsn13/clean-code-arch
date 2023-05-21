import { FindCouponByCode } from '../../../domain/repository/coupon.repository';
import { isValidCoupon } from '../../../domain/entity/coupon';

type ValidateCoupon = (code: string) => Promise<boolean>;

const createValidateCoupon =
  (findCouponByCode: FindCouponByCode): ValidateCoupon =>
    async (code: string) => {
      const coupon = await findCouponByCode(code);
      if (!coupon) throw new Error('Invalid coupon');
      return isValidCoupon(coupon);
    };

export { ValidateCoupon, createValidateCoupon };
