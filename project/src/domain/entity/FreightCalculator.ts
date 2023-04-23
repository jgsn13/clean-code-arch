import Item from './Item.ts';

export default interface FreightCalculator {
  calculate(item: Item): number;
}
