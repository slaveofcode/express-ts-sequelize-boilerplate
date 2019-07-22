import { Request, Response } from 'express';

const consoleLogger = (req: Request, res: Response, next: any) => {
  // tslint:disable-next-line
  console.log(`${req.method} ${req.path}`);
  next();
};

export default consoleLogger;
