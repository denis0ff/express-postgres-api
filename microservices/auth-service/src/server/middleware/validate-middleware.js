import { userBodyParams } from '../schema';

export const validateUserCredentials = (req, res, next) => {
  const validateError = validateRequestParams([
    { schema: userBodyParams, value: req.body },
  ]);

  checkOnError(res, validateError);

  next();
};

function checkOnError(res, validateError) {
  if (validateError) {
    throw res.status(400).json(validateError.message);
  }
}

function validateRequestParams(validateParams) {
  for (let i = 0; i < validateParams.length; i++) {
    const { schema, value } = validateParams[i];
    const validateError = schema.validate(value).error;

    return validateError;
  }
}
