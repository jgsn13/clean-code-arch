import Item from 'src/domain/entity/Item.ts';
import ItemRepository from 'src/domain/repository/ItemRepository.ts';
import Connection from 'src/infra/database/Connection.ts';

export default class ItemRepositoryDatabase implements ItemRepository {
  constructor(readonly connection: Connection) {}

  async findById(idItem: number): Promise<Item | undefined> {
    const [itemData] = await this.connection.query(
      `SELECT * FROM ccca.item WHERE id_item = ${idItem}`,
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
