import { RequestHandler } from 'express';
import { products } from 'products/data';
import { ProductModel, ProductDataBody } from 'products/types';
import productDataValidationSchema from 'products/validation-schemas/product-data-validation-schema';

const putProduct: RequestHandler<
  { id?: string },
  ProductModel | ErrorResponse,
  ProductDataBody,
  {}
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'Server setup error' });
    return;
  }

  try {
    const productData = productDataValidationSchema.validateSync(req.body);

    const foundProductIndex = products.findIndex((product) => String(product.id) === id);

    if (foundProductIndex === -1) {
      res.status(404).json({ error: `Product with id '${id}' was not found` });
      return;
    }

    const updatedProduct = {
      id: products[foundProductIndex].id,
      ...productData,
    };

    products.splice(foundProductIndex, 1, updatedProduct);

    res.status(200).json(updatedProduct);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(400).json({ error: message });
  }
};

export default putProduct;
