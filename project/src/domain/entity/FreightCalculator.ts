import { Item } from './';

export default interface FreightCalculator {
  calculate(item: Item): number;
}
