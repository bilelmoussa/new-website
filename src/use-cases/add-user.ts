import {makeUser} from '../entities/user';
const makeAddUser = (addUserDb: Function, User: any) => {
  const addUser = async (userInfo: any) => {
    const user = makeUser(userInfo);
    const paswhash = await user.makePswHash();
    const userDb = new User({
      _id: user._id,
      fullName: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
      email: user.email,
      role: user.role,
      password: paswhash,
      createdOn: user.createdOn,
      modifiedOn: user.modifiedOn,
    });

    const result = await addUserDb(userDb);

    return result;
  };

  return addUser;
};
export default makeAddUser;
