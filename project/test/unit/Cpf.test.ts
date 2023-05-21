import { createCpf } from '../../src/domain/entity/cpf';

test('Deve validar um cpf', function() {
  const cpf = createCpf('935.411.347-80');
  expect(cpf).toBeTruthy();
});

test('Deve tentar validar um cpf inválido', function() {
  expect(() => createCpf('123.456.789-99')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf inválido vazio', function() {
  expect(() => createCpf('')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf com todos os dígitos iguais', function() {
  expect(() => createCpf('111.111.111-11')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf inválido muito grande', function() {
  expect(() => createCpf('123.456.789-1000')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf inválido muito pequeno', function() {
  expect(() => createCpf('123.456')).toThrow(new Error('Invalid cpf'));
});
