import ItemRepository from 'src/domain/repository/ItemRepository.ts';
import SimulateFreightInput from 'src/application/usecase/simulate_freight/SimulateFreightInput.ts';
import SimulateFreightOutput from 'src/application/usecase/simulate_freight/SimulateFreightOutput.ts';
import FreightCalculator from 'src/domain/entity/FreightCalculator.ts';

export default class SimulateFreight {
  constructor(
    readonly itemRepository: ItemRepository,
    readonly freightCalculator: FreightCalculator,
  ) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput> {
    let amount = 0;
    for (const inputItem of input.items) {
      const item = await this.itemRepository.findById(inputItem.idItem);
      if (!item) throw new Error('Item not found');
      amount += this.freightCalculator.calculate(item) * inputItem.quantity;
    }
    return new SimulateFreightOutput(amount);
  }
}
