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
