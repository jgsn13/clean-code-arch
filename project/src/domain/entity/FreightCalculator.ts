import Item from 'src/domain/entity/Item.ts';

export default interface FreightCalculator {
  calculate(item: Item): number;
}
