import { static as StaticPublisher } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { UserController } from './controllers/UserController';
import consoleLogger from './middlewares/logger/consoleLogger';
import errorHandler from './middlewares/error/error';
import error404Handler from './middlewares/error/error404';

export class App extends Server {
  constructor() {
    super(process.env.NODE_ENV === 'development');

    this.app.disable('x-powered-by');

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(compression());
    this.app.use(cors());

    this.setupStatics('/static');
    this.setupMiddlewares();
    this.setupControllers();
    this.setupError();
  }

  private setupStatics(staticPath: string): void {
    this.app.use(staticPath, StaticPublisher(path.join(__dirname, 'public')));
  }

  private setupMiddlewares(): void {
    this.app.use(consoleLogger);
  }

  private setupControllers(): void {
    const userController = new UserController({someConfig: 'example'});

    super.addControllers([
      userController,
    ]);
  }

  private setupError(): void {
    this.app.use(error404Handler);
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      Logger.Imp(`Server listening on port: ${port}`);
    });
  }
}
