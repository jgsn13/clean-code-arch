import { Item } from '../entity/item';

type FindItemById = (idItem: number) => Promise<Item | undefined>;

export { FindItemById };
