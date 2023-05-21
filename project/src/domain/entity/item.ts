interface Item {
  idItem: number;
  category: string;
  description: string;
  price: number;
  width: number;
  height: number;
  length: number;
  weight: number;
}

function createItem(
  idItem: number,
  category: string,
  description: string,
  price: number,
  width = 0,
  height = 0,
  length = 0,
  weight = 0,
): Item {
  return {
    idItem,
    category,
    description,
    price,
    width,
    height,
    length,
    weight,
  };
}

function getItemVolume(item: Item): number {
  return (item.width / 100) * (item.height / 100) * (item.length / 100);
}

function getItemDensity(item: Item): number {
  return item.weight / getItemVolume(item);
}

export { Item, createItem, getItemVolume, getItemDensity };
