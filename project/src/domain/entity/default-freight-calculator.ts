import { FreightCalculator } from './freight-calculator';
import { Item, getItemVolume, getItemDensity } from './item';

const createDefaultFreightCalculator =
  (): FreightCalculator => (item: Item) => {
    if (!item.width || !item.height || !item.length || !item.weight) return 0;
    const freight = 1000 * getItemVolume(item) * (getItemDensity(item) / 100);
    const minFreight = 10;
    return Math.max(minFreight, freight);
  };

export { createDefaultFreightCalculator };
