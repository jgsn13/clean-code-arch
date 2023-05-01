import { Coupon } from '../../../domain/entity';
import { CouponRepository } from '../../../domain/repository';
import { Connection } from '../../database';

export default class CouponRepositoryDatabase implements CouponRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(code: string): Promise<Coupon | undefined> {
    const [couponData] = await this.connection.query(
      'SELECT * FROM ccca.coupon WHERE code = $1',
      [code],
    );
    if (!couponData) return;
    return new Coupon(
      couponData.code,
      couponData.percentage,
      couponData.expireDate,
    );
  }
}
