import FreightCalculator from './FreightCalculator.ts';
import Item from './Item.ts';

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    return 10;
  }
}
