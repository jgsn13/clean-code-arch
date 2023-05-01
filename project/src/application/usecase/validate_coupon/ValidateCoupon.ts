import { CouponRepository } from '../../../domain/repository';

export default class ValidateCoupon {
  constructor(readonly couponRepository: CouponRepository) {}

  async execute(code: string): Promise<boolean> {
    const coupon = await this.couponRepository.findByCode(code);
    if (!coupon) throw new Error('Invalid coupon');
    return coupon.isValid();
  }
}
