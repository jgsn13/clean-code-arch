import { Item } from '../../../domain/entity';
import { ItemRepository } from '../../../domain/repository';
import { Connection } from '../../database';

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async findById(idItem: number): Promise<Item | undefined> {
    const [itemData] = await this.connection.query(
      'SELECT * FROM ccca.item WHERE id_item = $1',
      [idItem],
    );

    if (!itemData) return;

    return new Item(
      itemData.id_item,
      itemData.category,
      itemData.description,
      itemData.price,
      itemData.width,
      itemData.height,
      itemData.length,
      itemData.weight,
    );
  }
}
