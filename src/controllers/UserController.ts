import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import PageNotFound from '../exceptions/PageNotFound';
import BadRequest from '../exceptions/BadRequest';
import { User } from '../repositories/pg';
import { bodyValidator } from '@middlewares/jsv';

const exampleSchema = {
  type: 'object',
  properties: {
    foo: { type: 'string', minLength: 10 },
    bar: { type: 'number', minimum: 5, maximum: 20 },
  },
  required: ['foo', 'bar'],
};

@Controller('api/users')
export class UserController {
  private config = {};

  constructor(config: any) {
    this.config = config;
  }

  @Get(':id')
  private async get(req: Request, res: Response) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(OK).json(user);
  }

  @Get('')
  private async list(req: Request, res: Response) {
    const users = await User.findAll({
      raw: true,
    });
    return res.status(OK).json(users);
  }

  @Post('validate')
  @Middleware([
    bodyValidator(exampleSchema),
  ])
  private validateExample(req: Request, res: Response) {
    return res.status(OK).json({
      detail: {
        name: 'Aditya',
      },
    });
  }

  @Get('tobe/404')
  private errNotFound(req: Request, res: Response, next: NextFunction) {
    next(new PageNotFound('Tidak ditemukan'));
  }

  @Get('tobe/400')
  private errBadRequest(req: Request, res: Response, next: NextFunction) {
    next(new BadRequest());
  }
}
