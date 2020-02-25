/* eslint-disable max-len */
import {GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLBoolean, GraphQLNonNull} from 'graphql';
import {mergeSchemas} from 'graphql-tools';
import {addUser as saveUser, getUser, login} from '../use-cases';
import userController from './user';
import {GraphQLDateTime} from 'graphql-iso-date';

const graphql = {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLDateTime,
  GraphQLBoolean,
  GraphQLNonNull,
};

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: {
    message: {type: GraphQLString},
  },
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getMsg: {
      type: MessageType,
      args: {
        test: {type: GraphQLString},
      },
      resolve: (root, args, {res}, info) => {
        res.cookie('id', 'Token', {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 7,
        });
        return {message: 'Hello world'};
      },
    },
  },
});

const queryschema = new GraphQLSchema({
  query: queryType,
});

const callUserController = userController({graphql, saveUser, getUser, login});

const {UserSchema} = callUserController;

const schemas = [queryschema, UserSchema];

const rootSchema = mergeSchemas({schemas});

export {rootSchema};

