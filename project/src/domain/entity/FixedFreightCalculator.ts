import { FreightCalculator, Item } from './';

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    return 10;
  }
}
