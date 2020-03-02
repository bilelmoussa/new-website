/* eslint-disable max-len */
import userSessionSchema from './UserSessionSchema';
// eslint-disable-next-line no-unused-vars
import {UserSession, UserSessionType} from './user-session';
import validateSchema from '../validator';
import Id from '../../Id';
import {accessTokenSecret, refreshTokenSecret} from '../../config';
import {verify} from 'jsonwebtoken';

const checkSessionSchemaValidation = validateSchema(userSessionSchema);

const makeUserSession = (userSessionInfo: UserSessionType) => new UserSession(userSessionInfo, Id.makeId, Id.isValidId, checkSessionSchemaValidation, accessTokenSecret, refreshTokenSecret, verify);

export default makeUserSession;
export {UserSessionType};
