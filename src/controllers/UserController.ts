import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { Mixin } from 'ts-mixer';
import PageNotFound from '@exceptions/PageNotFound';
import BadRequest from '@exceptions/BadRequest';
import ServerError from '@exceptions/InternalServerError';
import { User } from '@pgmodels';
import { bodyValidator } from '@middlewares/jsv';
import CRUD from '@mixins/CRUDBasic';

const exampleSchema = {
  type: 'object',
  properties: {
    foo: { type: 'string', minLength: 10 },
    bar: { type: 'number', minimum: 5, maximum: 20 },
  },
  required: ['foo', 'bar'],
};

@Controller('api/users')
export class UserController extends Mixin(CRUD) {
  private config = {};
  protected crudClass: any = User;
  protected entityName: string = 'User';

  constructor(config: any) {
    super();
    this.config = config;
  }

  @Get(':id')
  private async get_data(req: Request, res: Response) {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(OK).json(user);
  }

  @Get('')
  private async list_data(req: Request, res: Response) {
    const users = await User.findAll({
      raw: true,
    });
    return res.status(OK).json(users);
  }

  @Post('')
  private async create_data(req: Request, res: Response, next: NextFunction) {
    const created = await this.create(req.body);
    if (!created) {
      return next(new ServerError('Unable to create User'));
    }

    return res.status(CREATED).json(created);
  }

  @Put(':id')
  private async update_data(req: Request, res: Response, next: NextFunction) {
    const updateResult = await this.update(req.params.id, req.body);

    if (updateResult instanceof PageNotFound) {
      return next(updateResult);
    }

    const [isUpdated, data] = updateResult;
    return res.status(isUpdated ? OK : NO_CONTENT).json(data);
  }

  @Delete(':id')
  private async delete_data(req: Request, res: Response, next: NextFunction) {
    const deleted = await this.delete(req.params.id);
    return res.status(NO_CONTENT).end();
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
