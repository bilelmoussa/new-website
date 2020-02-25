/* eslint-disable max-len */
import crypto from 'crypto';
import {User} from './user';
import userSchema from './UserSchema';
import userValidator from '../validator';
import Id from '../../Id';
import argon2, {verify as verifyPassword} from 'argon2';
import LoginSchema from './LoginSchema';
import makeUserLogin from './login';
import {generateToken} from '../token';
import sanitizeHtml from 'sanitize-html';
import {accessTokenSecret, refreshTokenSecret} from '../../config';

const checkValidation = userValidator(userSchema);

const checkUserLogininfo = userValidator(LoginSchema);

/**
 * hash function
 * @param {string} text hashed text
 * @return {any} hash
 */
function md5(text: any): any {
  return crypto
      .createHash('md5')
      .update(text, 'utf8')
      .digest('hex');
}

const makeUser = (user:any) => new User(
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
