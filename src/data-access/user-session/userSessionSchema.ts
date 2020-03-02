/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import {Document, Schema, model, Model} from 'mongoose';
import {isCuid} from 'cuid';
import {TUserRoles} from '../../entities/user/user';

// Session Schema
const userSessionSchema = new Schema({
  userId: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function(v:any) {
        return isCuid(v);
      },
      message: '"userId" is not valid',
    },
  },
  sessionId: {
    type: String,
    trim: true,
    required: true,
    validate: {
      validator: function(v:any) {
        return isCuid(v);
      },
      message: '"sessionId" is not valid',
    },
  },
  refreshToken: {
    type: String,
    trim: true,
    required: true,
  },
  accessToken: {
    type: String,
    trim: true,
    required: true,
  },
  userHash: {
    type: String,
    trim: true,
    required: true,
  },
  userRole: {
    type: Number,
    enum: [0, 1],
    default: 0,
    required: true,
  },
  logs: {
    type: [Date],
    required: true,
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

interface UserSessionSchema extends Document {
    userId: string,
    sessionId: string,
    refreshToken: string,
    accessToken: string,
    userHash: string,
    userRole: TUserRoles,
    logs: [Date],
    createdOn: Date,
    modifiedOn: Date,
}

// Default export
const UserSession: Model<UserSessionSchema> = model('UserSession', userSessionSchema);
export default UserSession;

type UserById = {
    userId: string
}

export const getUserSessionByUserId = async ({userId}: UserById) => {
  const result = await UserSession.findOne({userId});

  return result;
};

type SessionById = {
    sessionId: string
}

export const getUserSessionBySessionId = async ({sessionId}: SessionById) => {
  const result = await UserSession.findOne({sessionId});

  return result;
};

export const addNewUserSession = async (userSession: UserSessionSchema) => {
  const result = await userSession.save();

  return result;
};

export const deleteUserSession = async ({sessionId}: SessionById) => {
  const result = await UserSession.deleteOne({sessionId});

  return result;
};

export {UserSessionSchema};
