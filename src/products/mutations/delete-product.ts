import { RequestHandler } from 'express';
import { products } from 'products/data';
import { ProductModel } from 'products/types';

const deleteProduct: RequestHandler<
  { id?: string },
  ProductModel | ErrorResponse,
  {},
  {}
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'Server setup error' });
  }

  const foundProductIndex = products.findIndex((product) => String(product.id) === id);

  if (foundProductIndex === -1) {
    res.status(404).json({ error: `Product with id '${id}' was not found` });
    return;
  }

  const [foundProduct] = products.splice(foundProductIndex, 1);

  res.status(200).json(foundProduct);
};

export default deleteProduct;
