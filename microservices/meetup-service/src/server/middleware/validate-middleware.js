import { bodyParams, idParam, queryParams } from '../schema';

export const validateGetAllMeetups = (req, res, next) => {
  const validateError = validateRequestParams([
    { schema: queryParams, value: req.query },
  ]);

  checkOnError(res, validateError);

  next();
};

export const validateGetMeetupById = (req, res, next) => {
  const validateError = validateRequestParams([
    { schema: idParam, value: req.params.id },
  ]);

  checkOnError(res, validateError);

  next();
};

export const validateCreateMeetup = (req, res, next) => {
  const validateError = validateRequestParams([
    { schema: bodyParams, value: req.body },
  ]);

  checkOnError(res, validateError);

  next();
};
export const validateUpdateMeetup = (req, res, next) => {
  const validateError = validateRequestParams([
    { schema: bodyParams, value: req.body },
    { schema: idParam, value: parseInt(req.params.id) },
  ]);

  checkOnError(res, validateError);

  next();
};

export const validateDeleteMeetup = validateGetMeetupById;

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
