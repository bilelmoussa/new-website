/* eslint-disable max-len */
import makeUserLogin from './login';
import validateSchema from '../validator';
import LoginSchema from './login-schema';
import {generateToken} from '../token';
import sanitizeHtml from 'sanitize-html';
import {accessTokenSecret, refreshTokenSecret} from '../../config';
import {verify as verifyPassword} from 'argon2';

const checkUserLogininfo = validateSchema(LoginSchema);

const userLogin = makeUserLogin({checkUserLogininfo, sanitize, verifyPassword, generateToken, accessTokenSecret, refreshTokenSecret});


/**
 * sanitize text
 * @param {string} text
 * @return {any}
 */
function sanitize(text: string): any {
  return sanitizeHtml(text, {
    allowedIframeHostnames: ['codesandbox.io', 'repl.it'],
  });
};

const userService = Object.freeze({
  userLogin,
});

export default userService;
export {userLogin};
