import cuid from 'cuid';
import {UserRoles} from '../src/entities/user/user';
import faker from 'faker';

const Id = Object.freeze({
  makeId: cuid,
  isValidId: cuid.isCuid,
});

const firstName = 'firstnametest';
const lastName = 'lastnametest';
const password = faker.random.alphaNumeric(14) || 'Test1234568e';
const email = faker.internet.email() || 'test@gmail.com';
/**
 * make Fake user
 * @param {any} overrides overrides fake user
 * @return {any} user
 */
export default function makeFakeUser(overrides?: any):any {
  const user = {
    _id: Id.makeId(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    role: UserRoles.Standard,
    password: password,
    repeatPassword: password,
    createdOn: new Date(),
    modifiedOn: new Date(),
  };
  return {
    ...user,
    ...overrides,
  };
}
