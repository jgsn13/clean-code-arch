type Item = Readonly<{
  idItem: number;
  category: string;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;
}>;

const createItem = (
  idItem: number,
  category: string,
  description: string,
  price: number,
  width = 0,
  height = 0,
  length = 0,
  weight = 0,
): Item => ({
  idItem,
  category,
  description,
  price,
  width,
  height,
  length,
  weight,
});

const getItemVolume = (item: Item): number =>
  (item.width / 100) * (item.height / 100) * (item.length / 100);

const getItemDensity = (item: Item): number =>
  item.weight / getItemVolume(item);

export { Item, createItem, getItemVolume, getItemDensity };
