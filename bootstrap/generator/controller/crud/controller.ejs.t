---
to: src/controllers/<%=h.inflection.classify(h.inflection.singularize(name))%>Controller.ts
---
import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { Mixin } from 'ts-mixer';
import { <%= h.inflection.classify(name) %> } from '@pgmodels';
import CRUD from '@mixins/CRUDBasic';
import PageNotFound from '@exceptions/PageNotFound';
import ServerError from '@exceptions/InternalServerError';

@Controller('<%= endpoint_base %>')
export class <%= h.inflection.classify(name) %>Controller extends Mixin(CRUD) {
  private config = {};
  protected crudClass: any = <%= h.inflection.classify(name) %>;
  protected entityName: string = '<%= h.inflection.classify(name) %>';

  constructor(config: any) {
    super();
    this.config = config;
  }

  @Get('')
  private async list_data(req: Request, res: Response) {
    const listItems = await <%= h.inflection.classify(name) %>.findAll({
      raw: true,
    });
    return res.status(OK).json(listItems);
  }

  @Get(':id')
  private async get_data(req: Request, res: Response) {
    const item = await <%= h.inflection.classify(name) %>.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(OK).json(item);
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

  @Post('')
  private async create_data(req: Request, res: Response, next: NextFunction) {
    const created = await this.create(req.body);
    if (!created) {
      return next(new ServerError('Unable to create <%= h.inflection.classify(name) %>'));
    }

    return res.status(CREATED).json(created);
  }

  @Delete(':id')
  private async delete_data(req: Request, res: Response) {
    await this.delete(req.params.id);
    return res.status(NO_CONTENT).end();
  }
}
