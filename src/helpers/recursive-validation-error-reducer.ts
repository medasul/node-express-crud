import { ValidationError } from 'yup';
import createId from './create-id';

const recursiveValidationErrorReducer = (
  prevErrObj: RecursiveStringObj,
  validationError: ValidationError,
  _index: number,
  validationErrors: ValidationError[],
): RecursiveStringObj => {
  const errorKey: string = validationError.path || String(createId());

  const [mainKey, ...childrenKeys] = errorKey.split('.');

  if (childrenKeys.length === 0) { // jei vaikiniu raktu neturi
    return {
      ...prevErrObj,
      [mainKey]: validationError.message,
    };
  }

  if (!(mainKey in prevErrObj)) {
    const childrenValidationErrors = validationErrors
      .filter((childValidationError) => childValidationError.path?.startsWith(`${mainKey}.`)) // atrenkam visus, kurie prasideda tasku
      .map((childError) => {
        const newValidationError = new ValidationError(
          childError.errors.length === 1 ? childError.message : childError.inner,
          childError.value,
          childError.path?.split('.').slice(1).join('.'), // atskirti visus be main zodzio (vietoj inventory.status tik status)
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

export default recursiveValidationErrorReducer;
