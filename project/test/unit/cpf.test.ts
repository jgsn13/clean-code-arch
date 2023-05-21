import { createCpf } from '../../src/domain/entity/cpf';

test('Deve validar um cpf', () => {
  const cpf = createCpf('935.411.347-80');
  expect(cpf).toBeTruthy();
});

test('Deve tentar validar um cpf inválido', () => {
  expect(() => createCpf('123.456.789-99')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf inválido vazio', () => {
  expect(() => createCpf('')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf com todos os dígitos iguais', () => {
  expect(() => createCpf('111.111.111-11')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf inválido muito grande', () => {
  expect(() => createCpf('123.456.789-1000')).toThrow(new Error('Invalid cpf'));
});

test('Deve tentar validar um cpf inválido muito pequeno', () => {
  expect(() => createCpf('123.456')).toThrow(new Error('Invalid cpf'));
});
