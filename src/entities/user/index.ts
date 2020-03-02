/* eslint-disable max-len */
import crypto from 'crypto';
// eslint-disable-next-line no-unused-vars
import {User, UserType} from './user';
import userSchema from './UserSchema';
import validateSchema from '../validator';
import Id from '../../Id';
import argon2, {verify as verifyPassword} from 'argon2';
import LoginSchema from './LoginSchema';
import makeUserLogin from './login';
import {generateToken} from '../token';
import sanitizeHtml from 'sanitize-html';
import {accessTokenSecret, refreshTokenSecret} from '../../config';

const checkValidation = validateSchema(userSchema);

const checkUserLogininfo = validateSchema(LoginSchema);

/**
 * hash function
 * @param {string} text hashed text
 * @return {any} hash
 */
function md5(text: string): any {
  return crypto
      .createHash('md5')
      .update(text, 'utf8')
      .digest('hex');
}

const makeUser = (user: UserType) => new User(
    Id.makeId,
    Id.isValidId,
    checkValidation,
    md5,
    argon2.hash,
    user,
);

const userLogin = makeUserLogin({checkUserLogininfo, sanitize, verifyPassword, generateToken, accessTokenSecret, refreshTokenSecret});

const userService = Object.freeze({
  makeUser,
  userLogin,
});

/**
 * sanitize text
 * @param {string} text
 * @return {any}
 */
function sanitize(text: string): any {
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it'],
  });
}

export default userService;
export {makeUser, userLogin};
