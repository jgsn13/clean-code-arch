interface OrderCode {
  value: string;
}

function createOrderCode(date: Date, sequence: number): OrderCode {
  return {
    value: generateOrderCodeValue(date, sequence),
  };
}

function generateOrderCodeValue(date: Date, sequence: number): string {
  return `${date.getFullYear()}${sequence.toString().padStart(8, '0')}`;
}

export { OrderCode, createOrderCode, generateOrderCodeValue };
