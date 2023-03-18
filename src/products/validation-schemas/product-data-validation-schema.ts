import { ProductData } from 'products/types';
import * as yup from 'yup';

const productDataValidationSchema: yup.ObjectSchema<ProductData> = yup.object({
  title: yup.string()
    .required('title is required')
    .min(2, 'title must have at least 2 letters')
    .max(50, 'title can\'t have more than 50 letters'),

  inventory: yup
    .object({
      status: yup.string()
        .required('inventory.status is required')
        .min(2, 'inventory.status must have at least 2 letters')
        .max(32, 'inventory.status can\'t have more than 32 letters'),

      units: yup.number()
      .required('units is required')
      .min(0, 'units must be greater than or equal to zero'),
    })
    .required('location is required'),

  images: yup
    .array(yup.string().required())
    .required('images are required'),

  price: yup.number()
    .required('price is required')
    .positive('price must be positive')
    .test(
      'priceFormat',
      'price can\'t have more than 2 decimal points',
      (value) => Number(value.toFixed(2)) === value,
    ),

}).strict(true);

export default productDataValidationSchema;
