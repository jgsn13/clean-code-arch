import { Item, createItem } from '../../../domain/entity/item';
import { FindItemById } from '../../../domain/repository/item.repository';

const items: Item[] = [
  createItem(1, 'Música', 'CD', 30, 30, 30, 10, 1),
  createItem(2, 'Vídeo', 'DVD', 50, 40, 20, 10, 1),
  createItem(3, 'Vídeo', 'VHS', 10, 40, 20, 10, 1),
  createItem(4, 'Instrumentos Musicais', 'Guitarra', 1000, 100, 30, 10, 3),
  createItem(5, 'Instrumentos Musicais', 'Amplificador', 5000, 100, 50, 50, 20),
  createItem(6, 'Acessórios', 'Cabo', 30, 10, 10, 10, 0.9),
];

const createFindItemByIdMemory = function(): FindItemById {
  return async function(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(items.find((item) => item.idItem === idItem));
  };
};

export { createFindItemByIdMemory };
