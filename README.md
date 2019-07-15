# Express Ts Sequelize Boilerplate

This is a simple Typescript Skeleton/Boilerplate project to help you get started with Express in a few minutes.

## Quick Start

### Start Dev!

Simply clone this repository and running `npm i` to get all dependencies installed. After completed run command below to run the development server.

> npm run dev

### Build

Get ready for prodiction? run command below to compile the script.

> npm run build

### Lint via tslint

> npm run lint

### Uses OvernightJs Decorator

This project was setup using OvernightJS typescript decorator to help you managing the controllers & the express behaviors. Take a look into `src/controllers/UserController.ts` to get you inspired!.

### Controllers

As mentioned before, you can see the example of controller on `src/controllers/UserController.ts`. It has several api endpoint examples also with error exception.

### Middlewares

Middlewares are placed into `src/middlewares` directory, everything about middleware should be dropped here.

### Exceptions

This project already supplied with some basic Exception class, see `src/exceptions` for the details. Also take a look into implementation on `controllers/UserController.ts` and `middlewares/error*.ts` for more detail usage.

### Interfaces

Middlewares are placed into `src/interfaces` directory, everything about interface should be dropped here.

## SequelizeJs Integration

Interact with database using SequelizeJs through typescript decorator via [sequelize-typescript](https://github.com/RobinBuschmann/sequelize-typescript).

Migrations & Seeders are defined on `bootstrap/sequelize` folder, and models are placed on `src/repositories/pg/models`. 

See the example of using models on `src/controllers/UserController.ts' for faster adaptation.

### Migration Commands

- `new:migration`: Create new migration 

  > npm run new:migration 'create-table-user'

- `new:seed`: Create new seeders

  > npm run new:seed 'initialize-user-admin'

- `run:migration`: Running existing migrations

  > npm run run:migration

- `run:migration:undo`: Undo the migration one-step 

  > npm run run:migration:undo

- `run:migration:undo-all`: Undo all the migrations

  > npm run run:migration:undo:all

- `run:migration:undo-until <migration-file>`: Undo all the migrations until specific migration target

  > npm run run:migration:undo-until 20190715055658-create-user-table


### Seeds Commands

- `run:seed`: Create new seeder

  > npm run run:seed

- `run:seed:undo`: Undo the seeds one-step

  > npm run run:seed:undo

- `run:seed:undo:all`: Undo all the seeds

  > npm run run:seed:undo:all


## Code Generator

This project shipped with a simple code generator borrows from `hyphen`. Some templates already setup on `bootstrap/generator` for initial project.

Example Command

> node ./gen.js controller new Auth --endpoint_base api/auth

The command above will generate new controller file called `AuthController.ts` with setup api endpoint to `api/auth`.

You can create more template like this with different options and purpose to boost up the productivity. See the template example on `generator/controller/new` directory and visit [http://www.hygen.io/generators](http://www.hygen.io/generators) for further possibility.

# License

This project is licensed under the MIT License 
