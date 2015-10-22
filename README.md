# express starter

A simple server setup.


## Usage

```bash
$ git clone https://github.com/robert52/express-starter.git
$ cd express-starter
$ npm install
$ cp config/environments/example.js config/environments/development.js
```

Modify configuration file accordingly.

To run the server us the following command, by default the server will run in development mode:

```bash
$ node server.js
```

## Running tests

To run a test simple use the following command:

```bash
mocha tests/unit/password.js
```

## Folder structure

### app

The main application folder containing all the server files, based on MVC structure.

- **controllers**: mostly will contain back-end business logic.
- **models**: this is where you store all Mongoose models.
- **routes**: Express routes will be found here. To include a route please see `config/routes.js` file.
- **views**: application view files, swig is used as the default view engine.
- **helpers**: helper functions used in the whole application, mainly units that can be tested stand-alone.
- **middlewares**: mountable business logic on routes, connect style middleware.

### config

The config folder contains files which configure different application parts.

- **environments**: environment configuration files.
- **strategies**: authentication strategies used by Passport.

### public

The public folder contains static assets of the application. Usually you can mount this folder as the root of the application in nginx to serve the static files from there.

### tests

The test folder stores the Mocha test suites.

- **unit**: contains only unit tests.
- **integration**: test suites that run on the whole application, or on modules that have dependencies.
- **fixtures**: data that can be loaded into MongoDB for testing.

## License

[MIT](https://github.com/robert52/quark/blob/master/LICENSE)
