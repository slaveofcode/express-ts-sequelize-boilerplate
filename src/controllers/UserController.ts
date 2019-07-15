import { OK, BAD_REQUEST } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import PageNotFound from '../exceptions/PageNotFound';
import BadRequest from '../exceptions/BadRequest';
import { User } from '../repositories/pg';

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

  @Get('tobe/404')
  private errNotFound(req: Request, res: Response, next: NextFunction) {
    next(new PageNotFound('Tidak ditemukan'));
  }

  @Get('tobe/400')
  private errBadRequest(req: Request, res: Response, next: NextFunction) {
    next(new BadRequest());
  }
}
