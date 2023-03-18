import { RequestHandler } from 'express';
import { products } from 'products/data';
import { ProductModel, ProductDataBody } from 'products/types';
import partialProductDataValidationSchema from 'products/validation-schemas/partial-product-data-validation-schema';

const patchProduct: RequestHandler<
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
    const productData = partialProductDataValidationSchema.validateSync(req.body);
    const foundProduct = products.find((product) => String(product.id) === id);

    if (foundProduct === undefined) {
      res.status(404).json({ error: `Product with id '${id}' was not found` });
      return;
    }

    Object.assign(foundProduct, productData);

    res.status(200).json(foundProduct);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    res.status(400).json({ error: message });
  }
};

export default patchProduct;
