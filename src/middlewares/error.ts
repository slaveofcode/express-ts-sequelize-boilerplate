import { Request, Response } from 'express';
import HTTPException from '../exceptions/HTTPException';
import ErrorResponse from '../interfaces/responses/ErrorResponse';
// import PageNotFoundException from '../exceptions/PageNotFound';

const errorHandler = (err: HTTPException, req: Request, res: Response, next: any): void => {
  // const err404 = new PageNotFoundException(req.path);
  const responseMsg = {
    status: err.status,
    message: err.message,
  } as ErrorResponse;
  res.status(err.status).json(responseMsg);
};

export default errorHandler;
