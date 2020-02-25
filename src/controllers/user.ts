/* eslint-disable max-len */
type UserArgs = {
  graphql: any,
  saveUser: Function,
  getUser: Function,
  login: Function,
}

const userController = ({graphql, saveUser, getUser, login}: UserArgs) => {
  const {GraphQLSchema, GraphQLObjectType, GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLDateTime, GraphQLBoolean, GraphQLNonNull} = graphql;

  const NameUserType = new GraphQLObjectType({
    name: 'NameUser',
    fields: {
      firstName: {type: new GraphQLNonNull(GraphQLString)},
      lastName: {type: new GraphQLNonNull(GraphQLString)},
    },
  });

  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
      id: {type: new GraphQLNonNull(GraphQLID)},
      fullName: {type: new GraphQLNonNull(NameUserType)},
      email: {type: new GraphQLNonNull(GraphQLString)},
      role: {type: new GraphQLNonNull(GraphQLInt)},
      createdOn: {type: new GraphQLNonNull(GraphQLDateTime)},
      modifiedOn: {type: new GraphQLNonNull(GraphQLDateTime)},
    },
  });

  const UserInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
      firstName: {type: new GraphQLNonNull(GraphQLString)},
      lastName: {type: new GraphQLNonNull(GraphQLString)},
      email: {type: new GraphQLNonNull(GraphQLString)},
      password: {type: new GraphQLNonNull(GraphQLString)},
      repeatPassword: {type: new GraphQLNonNull(GraphQLString)},
      createdOn: {type: new GraphQLNonNull(GraphQLString)},
      modifiedOn: {type: new GraphQLNonNull(GraphQLString)},
    },
  });

  const loginType = new GraphQLObjectType({
    name: 'loginOutput',
    fields: {
      success: {type: new GraphQLNonNull(GraphQLBoolean)},
      user: {type: new GraphQLNonNull(UserType)},
      accessToken: {type: new GraphQLNonNull(GraphQLString)},
    },
  });

  type LoginInfo = {
    email: string,
    password: string
  }

  type Context = {
    res: any,
    req: any,
  }

  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          user: {type: new GraphQLNonNull(UserInputType)},
        },
        resolve: async (_: any, {user}: any) => {
          const result = await saveUser(user);

          return result;
        },
      },

      login: {
        type: loginType,
        args: {
          email: {type: new GraphQLNonNull(GraphQLString)},
          password: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (_: any, {email, password}: LoginInfo, {res}: Context) => {
          const {success, user, accessToken, refreshToken} = await login({email, password});

          res.cookie('Token', refreshToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });

          return {success, user, accessToken};
        },
      },
    },
  });

  type getUserArgs = {
    id: string,
    accessToken: string
  }

  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      getUser: {
        type: UserType,
        args: {
          id: {type: new GraphQLNonNull(GraphQLString)},
          accessToken: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (_: any, {id, accessToken}: getUserArgs, {req}: Context) => {
          const refreshToken = req.cookies.Token;

          const result = await getUser({id, accessToken, refreshToken});

          return result;
        },
      },
    },
  });

  const UserSchema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType,
  });

  return {
    UserSchema,
  };
};

export default userController;
