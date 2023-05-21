import { FreightCalculator } from './freight-calculator';
import { Item } from './item';

const createFixedFreightCalculator = function(): FreightCalculator {
  return function(item: Item): number {
    return 10;
  };
};

export { createFixedFreightCalculator };
