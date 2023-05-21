import { createCoupon } from '../../../domain/entity/coupon';
import { FindCouponByCode } from '../../../domain/repository/coupon.repository';
import { Query } from '../../database';

const createFindCouponByCodeDatabase =
  (query: Query): FindCouponByCode =>
    async (code: string) => {
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

export { createFindCouponByCodeDatabase };
