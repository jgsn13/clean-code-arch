type Cpf = Readonly<{
  value: string;
}>;

const createCpf = (value: string): Cpf => {
  if (!validateCpf(value)) throw new Error('Invalid cpf');
  return { value };
};

const validateCpf = (rawCpf: string): boolean => {
  if (!rawCpf) return false;
  const cpf = cleanCpf(rawCpf);
  if (!isValidCpfLength(cpf)) return false;
  if (isBlockedCpf(cpf)) return false;
  const digit1 = calculateCpfDigit(cpf, 10);
  const digit2 = calculateCpfDigit(cpf, 11);
  const actualDigit = extractActualCpfDigit(cpf);
  const calculatedDigit = `${digit1}${digit2}`;
  return actualDigit === calculatedDigit;
};

const cleanCpf = (cpf: string): string => cpf.replace(/[.-]*/g, '');

const isValidCpfLength = (cpf: string): boolean => cpf.length === 11;

const isBlockedCpf = (cpf: string): boolean =>
  [...cpf].every((digit, _, [firstDigit]) => digit === firstDigit);

const calculateCpfDigit = (cpf: string, factor: number): number => {
  const total = [...cpf].reduce(
    (acc, digit) => (factor > 1 ? acc + +digit * factor-- : acc),
    0,
  );
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
};

const extractActualCpfDigit = (cpf: string): string => cpf.slice(9);

export { Cpf, createCpf };
