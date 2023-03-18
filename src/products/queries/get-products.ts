import { RequestHandler } from 'express';
import { products } from 'products/data';
import { ProductModel } from 'products/types';

const getProducts: RequestHandler<
  {},
  ProductModel[],
  undefined,
  {}
> = (_req, res) => {
  res.json(products);
};

export default getProducts;
