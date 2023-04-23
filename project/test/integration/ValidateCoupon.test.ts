import { assertEquals } from 'std/testing/asserts.ts';
import PostgresConnectionAdapter from '../../src/infra/database/PostgresConnectionAdapter.ts';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase.ts';
import ValidateCoupon from '../../src/application/usecase/validate_coupon/ValidateCoupon.ts';

Deno.test('Deve validar um cupom de desconto', async function () {
  const connection = PostgresConnectionAdapter.getInstance();
  const couponRepository = new CouponRepositoryDatabase(connection);
  const validateCoupon = new ValidateCoupon(couponRepository);
  const isValid = await validateCoupon.execute('VALE20');
  assertEquals(isValid, true);
});
