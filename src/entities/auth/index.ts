/* eslint-disable max-len */
import {verify} from 'jsonwebtoken';
import makeAuth from './auth';
import {tokenSchema} from '../token';
import joiValidator from '../validator';
import sanitizeHtml from 'sanitize-html';
import {accessTokenSecret, refreshTokenSecret} from '../../config';

const checkToken = joiValidator(tokenSchema);

const auth = makeAuth({verify, sanitize, checkToken, accessTokenSecret, refreshTokenSecret});

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

export default auth;
