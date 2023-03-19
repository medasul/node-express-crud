import { RequestHandler } from 'express';
import { products } from 'products/data';
import { PartialProductData, ProductModel } from 'products/types';
import productDataValidationSchema from 'products/validation-schemas/product-data-validation-schema';
import createId from 'helpers/create-id';
import handleRequestError from 'helpers/handle-request-error';

const createProduct: RequestHandler<
  {},
  ProductModel | ErrorResponse,
  PartialProductData,
  {}
> = (req, res) => {
  try {
    // { abortEarly: false } - tikrinti iki galo, kad visas klaidas ismestu, o ne pirma
    const productData = productDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const createdProduct = {
      id: createId(),
      ...productData,
    };

    products.push(createdProduct);

    res.status(201).json(createdProduct);
  } catch (err) {
    handleRequestError(err, res);
  }
};

export default createProduct;
