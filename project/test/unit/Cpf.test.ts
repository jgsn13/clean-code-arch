import { assert, assertThrows } from 'std/testing/asserts.ts';

import Cpf from 'src/domain/entity/Cpf.ts';

Deno.test('Deve validar um cpf', function () {
  const cpf = new Cpf('935.411.347-80');
  assert(cpf);
});

Deno.test('Deve tentar validar um cpf inválido', function () {
  assertThrows(() => new Cpf('123.456.789-99'), Error, 'Invalid cpf');
});

Deno.test('Deve tentar validar um cpf inválido vazio', function () {
  assertThrows(() => new Cpf(''), Error, 'Invalid cpf');
});

Deno.test(
  'Deve tentar validar um cpf com todos os dígitos iguais',
  function () {
    assertThrows(() => new Cpf('111.111.111-11'), Error, 'Invalid cpf');
  },
);

Deno.test('Deve tentar validar um cpf inválido muito grande', function () {
  assertThrows(() => new Cpf('123.456.789-1000'), Error, 'Invalid cpf');
});

Deno.test('Deve tentar validar um cpf inválido muito pequeno', function () {
  assertThrows(() => new Cpf('123.456'), Error, 'Invalid cpf');
});
