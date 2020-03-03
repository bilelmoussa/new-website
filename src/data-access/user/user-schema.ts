/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
import {Document, Schema, model, Model} from 'mongoose';
import {isCuid} from 'cuid';
import isEmail from './validator/is-email';

const RegexAlpha = /[^\w]|_/g;

// Schema
const userSchema = new Schema({
  _id: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function(v:any) {
        return isCuid(v);
      },
      message: '"_id" is not valid',
    },
  },
  fullName: {
    firstName: {
      type: String,
      trim: true,
      required: true,
      validate: [
        {
          validator: function(v: string) {
            return !RegexAlpha.test(v);
          },
          message: 'First name must only contain alpha-numeric characters',
        },
        {
          validator: function(v: string) {
            if (v.length < 4) {
              return false;
            }
          },
          message: 'First name length must be at least 3 characters long',
        },
        {
          validator: function(v: string) {
            if (v.length > 30) {
              return false;
            }
          },
          // eslint-disable-next-line max-len
          message: 'First name length must be less than or equal to 30 characters long',
        },
      ],
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      validate: [
        {
          validator: function(v: string) {
            return !RegexAlpha.test(v);
          },
          message: 'Last name must only contain alpha-numeric characters',
        },
        {
          validator: function(v: string) {
            if (v.length < 4) {
              return false;
            }
          },
          message: 'Last name length must be at least 3 characters long',
        },
        {
          validator: function(v: string) {
            if (v.length > 30) {
              return false;
            }
          },
          // eslint-disable-next-line max-len
          message: 'Last name length must be less than or equal to 30 characters long',
        },
      ],
    },
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: [true, 'Email must be unique'],
    validate: {
      validator: function(v: string) {
        return isEmail(v);
      },
      message: 'Email is not valid',
    },
  },
  role: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
  createdOn: {
    type: Date,
    required: true,
  },
  modifiedOn: {
    type: Date,
    required: true,
  },
});

// eslint-disable-next-line no-unused-vars
enum UserRoles {
    // eslint-disable-next-line no-unused-vars
    Standard,
    // eslint-disable-next-line no-unused-vars
    Admin,
}

type TUserRoles =
    UserRoles.Standard |
    UserRoles.Admin;


interface IUserSchema extends Document {
  _id: string,
  fullName: {
    firstName: string,
    lastName: string
  },
  email: string,
  role: TUserRoles,
  password: string,
  createdOn: Date,
  modifiedOn: Date
}

type UserInfo = {
  id: string,
  fullName: {
    firstName: string,
    lastName: string
  },
  email: string,
  role: TUserRoles,
  createdOn: Date,
  modifiedOn: Date,
}

/**
 * Return User info
 * @param {any} user
 * @return {UserInfo}
 */
function returnUserInfo(user: any): UserInfo {
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    createdOn: user.createdOn,
    modifiedOn: user.modifiedOn,
  };
}

// Default export
const User: Model<IUserSchema> = model('User', userSchema);
export default User;

export const getUserByEmail = async (email: string) => {
  const result = await User.findOne({email: email}).select(['_id', 'fullName', 'email', 'password', 'role', 'createdOn', 'modifiedOn']);
  if (result) {
    return {
      id: result._id,
      fullName: result.fullName,
      email: result.email,
      password: result.password,
      role: result.role,
      createdOn: result.createdOn,
      modifiedOn: result.modifiedOn,
    };
  }
  return result;
};

export const getUserById = async (id: string) => {
  const result = await User.findOne({_id: id});
  if (result) {
    return returnUserInfo(result);
  }
  return result;
};

export const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

export const addNewUser = async (user: IUserSchema) => {
  const result = await user.save();
  if (result) {
    return returnUserInfo(result);
  }
  return result;
};

export const deleteUserById = (_id: string) => {
  const result = User.deleteOne({_id: _id});
  return result;
};

export {UserInfo, IUserSchema};
