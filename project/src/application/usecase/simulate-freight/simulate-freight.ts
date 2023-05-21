import { FreightCalculator } from '../../../domain/entity/freight-calculator';
import { FindItemById } from '../../../domain/repository/item.repository';
import { SimulateFreightInput } from './simulate-freight.input';
import {
  SimulateFreightOutput,
  createSimulateFreightOutput,
} from './simulate-freight.output';

type SimulateFreight = (
  input: SimulateFreightInput,
) => Promise<SimulateFreightOutput>;

const createSimulateFreight = function(
  findItemById: FindItemById,
  freightCalculator: FreightCalculator,
): SimulateFreight {
  return async function simulateFreight(input: SimulateFreightInput) {
    const amount = await Promise.resolve(
      input.items.reduce(async (acc, inputItem) => {
        const item = await findItemById(inputItem.idItem);
        if (!item) throw new Error('Item not found');
        return (await acc) + freightCalculator(item) * inputItem.quantity;
      }, Promise.resolve(0)),
    );

    return createSimulateFreightOutput(amount);
  };
};

export { SimulateFreight, createSimulateFreight };
