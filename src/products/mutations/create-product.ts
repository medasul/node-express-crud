import { RequestHandler } from 'express';
import { products } from 'products/data';
import { PartialProductData, ProductModel } from 'products/types';
import productDataValidationSchema from 'products/validation-schemas/product-data-validation-schema';
import { createId } from 'helpers/create-id';
import { ValidationError } from 'yup';

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
  } catch (error) {
    const recursiveValidationErrorReducer = (
      prevErrObj: RecursiveStringObj,
      validationError: ValidationError,
      _index: number,
      validationErrors: ValidationError[],
    ): RecursiveStringObj => {
      const errorKey: string = validationError.path || String(createId());

      const [mainKey, ...childrenKeys] = errorKey.split('.');

      if (childrenKeys.length === 0) {
        return {
          ...prevErrObj,
          [mainKey]: validationError.message,
        };
      }

      if (!(mainKey in prevErrObj)) {
        const childrenValidationErrors = validationErrors
          .filter((childValidationError) => childValidationError.path?.includes(`${mainKey}.`))
          .map((childError) => {
            const newValidationError = new ValidationError(
              childError.errors.length === 1 ? childError.message : childError.inner,
              childError.value,
              childError.path?.split('.').slice(1).join('.'),
            );

            return newValidationError;
          });

        return {
          ...prevErrObj,
          [mainKey]: childrenValidationErrors.reduce(recursiveValidationErrorReducer, {}),
        };
      }

      return prevErrObj;
    };

    const errorResponse: ErrorResponse = {
      error: 'request error',
    };

    if (error instanceof ValidationError && error.errors.length > 0) {
      errorResponse.errors = error.inner.reduce(recursiveValidationErrorReducer, {});
    }
    if (error instanceof Error) {
      errorResponse.error = error.message;
    }

    res.status(400).json(errorResponse);
  }
};

export default createProduct;
