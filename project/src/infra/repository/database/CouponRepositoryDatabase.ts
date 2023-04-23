import Coupon from '../../../domain/entity/Coupon.ts';
import CouponRepository from '../../../domain/repository/CouponRepository.ts';
import Connection from '../../database/Connection.ts';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query(
      `SELECT * FROM ccca.coupon WHERE code = '${code}'`,
    );
    if (!couponData) return;
    return new Coupon(
      couponData.code,
      couponData.percentage,
      couponData.expireDate,
    );
  }
}
