type OrderCode = Readonly<{
  value: string;
}>;

const createOrderCode = (date: Date, sequence: number): OrderCode => ({
  value: generateOrderCodeValue(date, sequence),
});

const generateOrderCodeValue = (date: Date, sequence: number): string =>
  `${date.getFullYear()}${sequence.toString().padStart(8, '0')}`;

export { OrderCode, createOrderCode, generateOrderCodeValue };
