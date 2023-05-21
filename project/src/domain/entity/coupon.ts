interface Coupon {
  readonly code: string;
  readonly percentage: number;
  readonly expireDate?: Date;
}

function createCoupon(
  code: string,
  percentage: number,
  expireDate?: Date,
): Coupon {
  return {
    code,
    percentage,
    expireDate,
  };
}

function isValidCoupon(coupon: Coupon, today: Date = new Date()): boolean {
  return !coupon.expireDate || coupon.expireDate >= today;
}

function isExpiredCoupon(coupon: Coupon, today: Date = new Date()): boolean {
  return !isValidCoupon(coupon, today);
}

function calculateCouponDiscount(
  coupon: Coupon,
  amount: number,
  today: Date = new Date(),
): number {
  return isExpiredCoupon(coupon, today)
    ? 0
    : (amount * coupon.percentage) / 100;
}

export {
  Coupon,
  createCoupon,
  isValidCoupon,
  isExpiredCoupon,
  calculateCouponDiscount,
};
