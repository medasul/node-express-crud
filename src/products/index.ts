import express from 'express';
import getProducts from './queries/get-products';
import getProduct from './queries/get-product';

const productsRouter = express.Router();

// get all
productsRouter.get('/', getProducts);

// get all by id
productsRouter.get('/:id', getProduct);

// create one
productsRouter.post('/', (_req, res) => {
  // console.log(req.body);
  res.send('create one product');
});

// update one
productsRouter.patch('/:id', (_req, res) => {
  res.send('updated one product');
});

// delete one
productsRouter.delete('/:id', (_req, res) => {
  res.send('deleted one product');
});

export default productsRouter;
