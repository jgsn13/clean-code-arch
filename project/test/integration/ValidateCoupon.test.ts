import { getPostgresQuery } from '../../src/infra/database';
import { createFindCouponByCodeDatabase } from '../../src/infra/repository/database/coupon-repository-database';
import { createValidateCoupon } from '../../src/application/usecase/validate-coupon';

test('Deve validar um cupom de desconto', async function() {
  const query = getPostgresQuery();
  const findCouponByCode = createFindCouponByCodeDatabase(query);
  const validateCoupon = createValidateCoupon(findCouponByCode);
  const isValid = await validateCoupon('VALE20');
  expect(isValid).toBe(true);
});
