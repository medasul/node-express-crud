import { RequestHandler } from 'express';
import { products } from 'products/data';
import { PartialProductData, ProductModel } from 'products/types';
import productDataValidationSchema from 'products/validation-schemas/product-data-validation-schema';
import { createId } from 'helpers/create-id';

const createProduct: RequestHandler<
  {},
  ProductModel | ErrorResponse,
  PartialProductData,
  {}
> = (req, res) => {
  try {
    const productData = productDataValidationSchema.validateSync(req.body);
    const createdProduct = {
      id: createId(),
      ...productData,
    };

    products.push(createdProduct);

    res.status(201).json(createdProduct);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(400).json({ error: message });
  }
};

export default createProduct;
