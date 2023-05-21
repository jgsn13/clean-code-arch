import { createItem } from '../../../domain/entity/item';
import { FindItemById } from '../../../domain/repository/item.repository';
import { Query } from '../../database';

const createFindItemByIdDatabase =
  (query: Query): FindItemById =>
    async (idItem: number) => {
      const [itemData] = await query(
        'SELECT * FROM ccca.item WHERE id_item = $1',
        [idItem],
      );

      if (!itemData) return;

      return createItem(
        itemData.id_item,
        itemData.category,
        itemData.description,
        itemData.price,
        itemData.width,
        itemData.height,
        itemData.length,
        itemData.weight,
      );
    };

export { createFindItemByIdDatabase };
