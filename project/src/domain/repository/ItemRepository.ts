import Item from 'src/domain/entity/Item.ts';

export default interface ItemRepository {
  findById(idItem: number): Promise<Item | undefined>;
}
