import express from 'express';
import getProducts from './queries/get-products';
import getProduct from './queries/get-product';
import createProduct from './mutations/create-product';
import deleteProduct from './mutations/delete-product';

const productsRouter = express.Router();

// get all
productsRouter.get('/', getProducts);

// get all by id
productsRouter.get('/:id', getProduct);

// create one
productsRouter.post('/', createProduct);

// update one
productsRouter.patch('/:id', (_req, res) => {
  res.send('updated one product');
});

// delete one
productsRouter.delete('/:id', deleteProduct);

export default productsRouter;
