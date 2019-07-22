import ajv from 'ajv';
import { BAD_REQUEST } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

const createValidator = (sourceFnResolver: (req: Request) => any) => {
  return (schema: any, handler: void) => {
    // create ajv with schema
    const jsonValidator = new ajv({ schemaId: 'auto', allErrors: true });

    // create validation function
    const validate = (data: any) => {
      const isValid = jsonValidator.validate(schema, data);
      return {
        valid: isValid,
        validator: jsonValidator,
      };
    };

    return (req: Request, res: Response, next: NextFunction) => {
      // call validation function
      const { valid, validator } = validate(sourceFnResolver(req));
      if (!valid && validator.errors) {
        return res.status(BAD_REQUEST).json({
          errors: validator.errors.map((err) => ({
            rule: err.keyword,
            message: err.message,
          })),
        });
      }

      return next();
    };
  };
};

const bodyValidator = createValidator((req) => req.body);
const queryValidator = createValidator((req) => req.query);

export {
  bodyValidator,
  queryValidator,
};
