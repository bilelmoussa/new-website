/* eslint-disable max-len */
import './loadEnv';
import App from './app';
import * as bodyParser from 'body-parser';
import mongoose from 'mongoose';
import {port, dbServer} from './config';
import {logger} from './shared/logger';
import {rootSchema} from './controllers';
import cookieParser from 'cookie-parser';

mongoose.connect(dbServer,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
);

//  on connected start the experess server
mongoose.connection.on('connected', () => {
  logger.info(`Connected to ${dbServer} DB!`);
  const app = new App({
    port: port,
    controller: {
      schema: rootSchema,
    },
    middleWares: [
      bodyParser.json(),
      bodyParser.urlencoded({extended: true}),
      cookieParser(),
    ],
  });
  app.listen();
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  logger.error(`Failed to connect to DB  ${dbServer} on startup`, err);
});

const gracefulExit = () => {
  mongoose.connection.close(() => {
    // eslint-disable-next-line max-len
    logger.info(`Mongoose default connection with DB : ${dbServer} is disconnected through app termination`);
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

