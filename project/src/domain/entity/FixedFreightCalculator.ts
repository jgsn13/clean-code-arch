import FreightCalculator from 'src/domain/entity/FreightCalculator.ts';
import Item from 'src/domain/entity/Item.ts';

export default class FixedFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    return 10;
  }
}
