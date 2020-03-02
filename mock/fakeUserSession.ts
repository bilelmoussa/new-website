/* eslint-disable max-len */
import cuid from 'cuid';
import makeFakeUser from './fakeUser';
import {makeUser} from '../src/entities/user';
import {accessTokenSecret, refreshTokenSecret} from '../src/config';
import {generateToken} from '../src/entities/token';

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

const fakeUser = makeFakeUser();
const user: any = makeUser(fakeUser);

const payload = {
  id: user._id,
  email: user.email,
  fullName: {
    firstName: user.firstName,
    lastName: user.lastName,
  },
  role: user.role,
  createdOn: user.createdOn,
  modifiedOn: user.modifiedOn,
};

const accessToken = generateToken({payload, expiresIn: 90000, secret: accessTokenSecret});
const refreshToken = generateToken({payload, expiresIn: 90000, secret: refreshTokenSecret});

/**
 * make Fake user session
 * @param {any} overrides overrides fake user session
 * @return {any} user session
 */
export default function makeFakeUserSession(overrides?: any):any {
  const userSession = {
    userId: user._id,
    sessionId: Id.makeId(),
    refreshToken: refreshToken,
    accessToken: accessToken,
    userHash: user.makeHash(),
    userRole: user.role,
    logs: [new Date()],
    createdOn: new Date(),
    modifiedOn: new Date(),
  };
  return {
    ...userSession,
    ...overrides,
  };
}
