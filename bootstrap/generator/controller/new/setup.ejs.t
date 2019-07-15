---
to: src/controllers/<%=h.capitalize(name)%>Controller.ts
---
import { OK, CREATED } from 'http-status-codes';
import { Controller, Get, Post, Put, Delete } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('<%= endpoint_base %>')
export class <%= h.capitalize(name) %>Controller {
  private config = {};

  constructor(config: any) {
    this.config = config;
  }

  @Get('')
  private list(req: Request, res: Response) {
    return res.status(OK).json([]);
  }

  @Get(':id')
  private get(req: Request, res: Response) {
    return res.status(OK).json({});
  }

  @Put(':id')
  private update(req: Request, res: Response) {
    return res.status(OK).json({});
  }

  @Post('')
  private create(req: Request, res: Response) {
    return res.status(CREATED).json({});
  }

  @Delete(':id')
  private delete(req: Request, res: Response) {
    return res.status(OK).json({});
  }
}
