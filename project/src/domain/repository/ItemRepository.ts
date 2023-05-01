import { Item } from '../entity';

export default interface ItemRepository {
  findById(idItem: number): Promise<Item | undefined>;
}
