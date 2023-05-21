type Coupon = Readonly<{
  code: string;
  percentage: number;
  expireDate?: Date;
}>;

const createCoupon = (
  code: string,
  percentage: number,
  expireDate?: Date,
): Coupon => ({
  code,
  percentage,
  expireDate,
});

const isValidCoupon = (coupon: Coupon, today: Date = new Date()): boolean =>
  !coupon.expireDate || coupon.expireDate >= today;

const isExpiredCoupon = (coupon: Coupon, today: Date = new Date()): boolean =>
  !isValidCoupon(coupon, today);

const calculateCouponDiscount = (
  coupon: Coupon,
  amount: number,
  today: Date = new Date(),
): number =>
  isExpiredCoupon(coupon, today) ? 0 : (amount * coupon.percentage) / 100;

export {
  Coupon,
  createCoupon,
  isValidCoupon,
  isExpiredCoupon,
  calculateCouponDiscount,
};
