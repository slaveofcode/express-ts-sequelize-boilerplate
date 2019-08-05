---
to: src/controllers/<%=h.capitalize(h.inflection.singularize(name))%>Controller.ts
---
import { OK, CREATED } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response, NextFunction } from 'express';
import { Mixin } from 'ts-mixer';
import { <%= h.capitalize(name) %> } from '@pgmodels';
import CRUD from '@mixins/CRUDBasic';
import PageNotFound from '@exceptions/PageNotFound';
import ServerError from '@exceptions/InternalServerError';

@Controller('<%= endpoint_base %>')
export class <%= h.capitalize(name) %>Controller extends Mixin(CRUD) {
  private config = {};
  protected crudClass: any = <%= h.capitalize(name) %>;
  protected entityName: string = '<%= h.capitalize(name) %>';


  constructor(config: any) {
    super()
    this.config = config;
  }

  @Get('')
  private async list_data(req: Request, res: Response) {
    const <%= h.inflection.underscore(name) %> = await <%= h.capitalize(name) %>.findAll({
      raw: true,
    });
    return res.status(OK).json(<%= h.inflection.underscore(name) %>);
  }

  @Get(':id')
  private async get_data(req: Request, res: Response) {
    const <%= h.inflection.underscore(name) %> = await <%= h.capitalize(name) %>.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(OK).json(<%= h.inflection.underscore(name) %>);
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
      return next(new ServerError('Unable to create <%= h.capitalize(name) %>'));
    }

    return res.status(CREATED).json(created);
  }

  @Delete(':id')
  private async delete_data(req: Request, res: Response) {
    await this.delete(req.params.id);
    return res.status(NO_CONTENT).end();
  }
}
