import { PostgresConnectionAdapter } from '../../src/infra/database';
import { CouponRepositoryDatabase } from '../../src/infra/repository/database';
import { ValidateCoupon } from '../../src/application/usecase/validate_coupon';

test('Deve validar um cupom de desconto', async function () {
  const connection = PostgresConnectionAdapter.getInstance();
  const couponRepository = new CouponRepositoryDatabase(connection);
  const validateCoupon = new ValidateCoupon(couponRepository);
  const isValid = await validateCoupon.execute('VALE20');
  expect(isValid).toBe(true);
});
