export type ProductModel = {
  id: number,
  title: string,
  inventory: {
    status: string,
    units: number
  },
  images: string [],
  price: number,
};

export type ProductData = Omit<ProductModel, 'id'>;

export type PartialProductData = PartialRecursive<ProductData>;
