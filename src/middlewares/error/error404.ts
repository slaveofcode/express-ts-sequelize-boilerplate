import { NOT_FOUND } from 'http-status-codes';
import { Request, Response } from 'express';
import ErrorResponse from '@interfaces/responses/ErrorResponse';

const error404 = (req: Request, res: Response, next: any): void => {
  const response = {
    status: NOT_FOUND,
    message: 'Page Not Found',
  } as ErrorResponse;
  res.status(NOT_FOUND).json(response);
};

export default error404;
