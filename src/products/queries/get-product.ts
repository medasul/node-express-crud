import ServerSetupError from 'errors/server-setup-error';
import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import { products } from 'products/data';
import ProductNotFoundError from 'products/product-not-found-error';
import { ProductModel } from 'products/types';

const getProduct: RequestHandler<
  { id?: string },
  ProductModel | ErrorResponse,
  undefined,
  {}
> = (req, res) => {
  const { id } = req.params;

  try {
  if (id === undefined) throw new ServerSetupError();
  const foundProduct = products.find((product) => String(product.id) === id);
  if (foundProduct === undefined) throw new ProductNotFoundError(id);

  res.status(200).json(foundProduct);
} catch (err) {
  handleRequestError(err, res);
}
};
export default getProduct;
