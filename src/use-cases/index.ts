/* eslint-disable max-len */
import User, {addNewUser, getUserById, getUserByEmail} from '../data-access/user';
import makeAddUser from './add-user';
import makeGetUserById from './get-user';
import makeLogin from './login';
import auth from '../entities/auth';

const addUser = makeAddUser(addNewUser, User);

const getUser = makeGetUserById({getUser: getUserById, auth});

const login = makeLogin({getUserByEmail});

const userService = Object.freeze({
  addUser,
  getUser,
  login,
});

export default userService;
export {addUser, getUser, login};
