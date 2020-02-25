/**
 * make Fake user
 * @param {any} user fake user
 * @param {any} overrides overrides fake user
 * @return {any} user
*/
export default function makeFakeUserDb(user: any, overrides?: any):any {
  const userDb = {
    _id: user._id,
    fullName: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    email: user.email,
    role: user.role,
    password: user.password,
    createdOn: user.createdOn,
    modifiedOn: user.modifiedOn,
  };
  return {
    ...userDb,
    ...overrides,
  };
};
