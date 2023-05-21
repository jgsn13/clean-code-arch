import {
  createCoupon,
  isValidCoupon,
  isExpiredCoupon,
  calculateCouponDiscount,
} from '../../src/domain/entity/coupon';

test('Deve criar um cupom de desconto válido', () => {
  const coupon = createCoupon('VALE20', 20, new Date('2023-04-22'));
  const today = new Date('2023-04-21');
  const isValid = isValidCoupon(coupon, today);
  expect(isValid).toBe(true);
});

test('Deve criar um cupom de desconto expirado', () => {
  const coupon = createCoupon('VALE20', 20, new Date('2023-04-20'));
  const today = new Date('2023-04-21');
  const isExpired = isExpiredCoupon(coupon, today);
  expect(isExpired).toBe(true);
});

test('Deve criar um cupom de desconto válido e calcular o desconto', () => {
  const coupon = createCoupon('VALE20', 20);
  const amount = calculateCouponDiscount(coupon, 1000);
  expect(amount).toBe(200);
});
