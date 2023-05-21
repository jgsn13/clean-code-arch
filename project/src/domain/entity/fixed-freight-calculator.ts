import { FreightCalculator } from './freight-calculator';
import { Item } from './item';

const createFixedFreightCalculator = (): FreightCalculator => (item: Item) =>
  10;

export { createFixedFreightCalculator };
