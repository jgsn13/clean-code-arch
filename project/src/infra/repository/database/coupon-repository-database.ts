import { Coupon, createCoupon } from '../../../domain/entity/coupon';
import { FindCouponByCode } from '../../../domain/repository/coupon.repository';
import { Query } from '../../database';

const createFindCouponByCodeDatabase = function(query: Query): FindCouponByCode {
  return async function(code: string): Promise<Coupon | undefined> {
    const [couponData] = await query(
      'SELECT * FROM ccca.coupon WHERE code = $1',
      [code],
    );

    if (!couponData) return;

    return createCoupon(
      couponData.code,
      couponData.percentage,
      couponData.expireDate,
    );
  };
};

export { createFindCouponByCodeDatabase };
