import CouponRepository from 'src/domain/repository/CouponRepository.ts';
import Coupon from 'src/domain/entity/Coupon.ts';
import Connection from 'src/infra/database/Connection.ts';

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
