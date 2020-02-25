/* eslint-disable max-len */
import mongoose from 'mongoose';
import User from '../data-access/user';
import request from 'supertest';
import {rootSchema} from '../controllers';
import * as bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/graphql', graphqlHTTP({
  schema: rootSchema,
  graphiql: true,
}));


describe('graphql-test', () => {
  beforeAll(async () => {
    try {
      const url = String(process.env.MONGO_URL);
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('graphql-add-user', () => {
    it('add new user with graphql api, user must be saved with success', async () => {
      const req = request(app)
          .post('/graphql')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .send({query: `
            mutation {
                addUser(user: {
                    firstName: "testfirstName",
                    lastName: "testlastName",
                    email: "testemail@gmail.com",
                    password: "Testpassword123",
                    repeatPassword: "Testpassword123",
                    createdOn: "2020-02-18T01:42:32.662Z",
                    modifiedOn: "2020-02-18T01:42:32.662Z",
                }){
                    _id
                    fullName { firstName lastName }
                    email
                    createdOn
                }
            }
        `});

      const res = await req;

      expect(res.status).toEqual(200);
      expect(res.body.data.addUser._id).toBeDefined();
      expect(res.body.data.addUser.fullName.firstName).toEqual('testfirstName');
      expect(res.body.data.addUser.fullName.lastName).toEqual('testlastName');
      expect(res.body.data.addUser.email).toEqual('testemail@gmail.com');
    });
  });
});
