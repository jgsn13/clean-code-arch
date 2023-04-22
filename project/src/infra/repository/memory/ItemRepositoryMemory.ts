import Item from 'src/domain/entity/Item.ts';
import ItemRepository from 'src/domain/repository/ItemRepository.ts';

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];

  constructor() {
    this.items = [
      new Item(1, 'Música', 'CD', 30),
      new Item(2, 'Vídeo', 'DVD', 50),
      new Item(3, 'Vídeo', 'VHS', 10),
      new Item(4, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
      new Item(
        5,
        'Instrumentos Musicais',
        'Amplificador',
        5000,
        100,
        50,
        50,
        20,
      ),
      new Item(6, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9),
    ];
  }

  findById(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.idItem === idItem));
  }
}
