import ServerSetupError from 'errors/server-setup-error';
import { RequestHandler } from 'express';
import handleRequestError from 'helpers/handle-request-error';
import { products } from 'products/data';
import ProductNotFoundError from 'products/product-not-found-error';
import { ProductModel, ProductDataBody } from 'products/types';
import productDataValidationSchema from 'products/validation-schemas/product-data-validation-schema';

const putProduct: RequestHandler<
  { id?: string },
  ProductModel | ErrorResponse,
  ProductDataBody,
  {}
> = (req, res) => {
  const { id } = req.params;

  try {
 if (id === undefined) throw new ServerSetupError();
    const productData = productDataValidationSchema.validateSync(req.body);

    const foundProductIndex = products.findIndex((product) => String(product.id) === id);

    if (foundProductIndex === -1) throw new ProductNotFoundError(id);

    const updatedProduct = {
      id: products[foundProductIndex].id,
      ...productData,
    };

    products.splice(foundProductIndex, 1, updatedProduct);

    res.status(200).json(updatedProduct);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default putProduct;
