/* eslint-disable max-len */
import crypto from 'crypto';
// eslint-disable-next-line no-unused-vars
import {User, UserType} from './user';
import userSchema from './user-schema';
import validateSchema from '../validator';
import Id from '../../Id';
import {hash} from 'argon2';


const checkValidation = validateSchema(userSchema);

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
    hash,
    user,
);


const userService = Object.freeze({
  makeUser,
});


export default userService;
export {makeUser};
