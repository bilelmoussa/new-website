import express from 'express';
// eslint-disable-next-line no-unused-vars
import {Application} from 'express';
import {logger} from './shared/logger';
import graphqlHTTP from 'express-graphql';

/**
 * create class for Express Application.
*/
class App {
    public app: Application
    public port: number
    /**
     * initialize App properties.
     * @param {object} appInit App Prop Required !.
     */
    constructor(
        appInit:
            {port: number, middleWares: any, controller: any},
    ) {
      this.app = express();
      this.port = appInit.port;
      this.middlewares(appInit.middleWares);
      this.graphqlRoute(appInit.controller);
    }
    /**
     * initialize middlewares
     * @param {void} middleWares
     */
    private middlewares(middleWares: {
      forEach: (arg0: (middleWare: any) => void) => void; }) {
      middleWares.forEach((middleWare) => {
        this.app.use(middleWare);
      });
    }
    /**
     * initialize graphql controller
     * @param {any} controller
     */
    private graphqlRoute(controller: any) {
      this.app.use('/graphql', graphqlHTTP((req, res) => (
        {
          schema: controller.schema,
          graphiql: true,
          context: {req, res},
          customFormatErrorFn: (err) => {
            return {success: false, error: err.message};
          },
        }
      )));
    }
    /**
     * initialize Express Server
     */
    public listen() {
      this.app.listen(this.port, () => {
        logger.info(`Server Started on Port : ${this.port}`);
      });
    }
}

export default App;
