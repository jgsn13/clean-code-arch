interface Cpf {
  value: string;
}

function createCpf(value: string): Cpf {
  if (!validateCpf(value)) throw new Error('Invalid cpf');
  return { value };
}

function validateCpf(rawCpf: string): boolean {
  if (!rawCpf) return false;
  const cpf = cleanCpf(rawCpf);
  if (!isValidCpfLength(cpf)) return false;
  if (isBlockedCpf(cpf)) return false;
  const digit1 = calculateCpfDigit(cpf, 10);
  const digit2 = calculateCpfDigit(cpf, 11);
  const actualDigit = extractActualCpfDigit(cpf);
  const calculatedDigit = `${digit1}${digit2}`;
  return actualDigit === calculatedDigit;
}

function cleanCpf(cpf: string): string {
  return cpf.replace(/[.-]*/g, '');
}

function isValidCpfLength(cpf: string): boolean {
  return cpf.length === 11;
}

function isBlockedCpf(cpf: string): boolean {
  return [...cpf].every((digit, _, [firstDigit]) => digit === firstDigit);
}

function calculateCpfDigit(cpf: string, factor: number): number {
  const total = [...cpf].reduce(
    (acc, digit) => (factor > 1 ? acc + +digit * factor-- : acc),
    0,
  );
  const rest = total % 11;
  return rest < 2 ? 0 : 11 - rest;
}

function extractActualCpfDigit(cpf: string): string {
  return cpf.slice(9);
}

export { Cpf, createCpf };
