import ServerSetupError from 'errors/server-setup-error';
import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import { products } from 'products/data';
import ProductNotFoundError from 'products/product-not-found-error';
import { ProductModel } from 'products/types';

const deleteProduct: RequestHandler<
  { id?: string },
  ProductModel | ErrorResponse,
  {},
  {}
> = (req, res) => {
  const { id } = req.params;
  try {
  if (id === undefined) throw new ServerSetupError();

  const foundProductIndex = products.findIndex((product) => String(product.id) === id);

  if (foundProductIndex === -1) throw new ProductNotFoundError(id);

  const [foundProduct] = products.splice(foundProductIndex, 1);

  res.status(200).json(foundProduct);
} catch (err) {
  handleRequestError(err, res);
}
};

export default deleteProduct;
