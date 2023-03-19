import ServerSetupError from 'errors/server-setup-error';
import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import { products } from 'products/data';
import ProductNotFoundError from 'products/product-not-found-error';
import { ProductModel, ProductDataBody } from 'products/types';
import partialProductDataValidationSchema from 'products/validation-schemas/partial-product-data-validation-schema';

const patchProduct: RequestHandler<
  { id?: string },
  ProductModel | ErrorResponse,
  ProductDataBody,
  {}
> = (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const productData = partialProductDataValidationSchema.validateSync(req.body);
    const foundProduct = products.find((product) => String(product.id) === id);

    if (foundProduct === undefined) throw new ProductNotFoundError(id);

    Object.assign(foundProduct, productData);

    res.status(200).json(foundProduct);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default patchProduct;
