import { RequestHandler } from 'express';
import { products } from 'products/data';
import { ProductModel } from 'products/types';

const getProduct: RequestHandler<
  { id?: string },
  ProductModel | { error: string },
  undefined,
  {}
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'Server setup error' });
    return;
  }

  const foundProduct = products.find((product) => String(product.id) === id);

  if (foundProduct === undefined) {
    res.status(404).json({ error: `Product with id '${id}' was not found` });
    return;
  }

  res.status(200).json(foundProduct);
};

export default getProduct;
