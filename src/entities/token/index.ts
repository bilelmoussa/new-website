/* eslint-disable max-len */
import makeGenerateToken from './token';
import {sign} from 'jsonwebtoken';
import tokenSchema from './token-schema';

const generateToken = makeGenerateToken({sign});

const tokenService = Object.freeze({
  generateToken,
  tokenSchema,
});

export default tokenService;

export {generateToken, tokenSchema};

