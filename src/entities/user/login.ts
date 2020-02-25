/* eslint-disable max-len */
type MakeLoginArgs = {
  checkUserLogininfo: Function,
  verifyPassword: Function,
  sanitize: Function,
  generateToken: Function,
  accessTokenSecret: string,
  refreshTokenSecret: string,
};

type LoginArgs = {
  email: string,
  password: string,
  getUserByEmail: Function,
};

const makeUserLogin = ({checkUserLogininfo, sanitize, verifyPassword, generateToken, accessTokenSecret, refreshTokenSecret}: MakeLoginArgs) => {
  const UserLogin = async ({email, password, getUserByEmail}: LoginArgs) => {
    const userInfoValidate = checkUserLogininfo({
      email: email,
      password: password,
    });

    if (userInfoValidate) {
      return new Error(userInfoValidate);
    }

    const cleanEmail = sanitize(email);

    if (cleanEmail.length < 1) {
      return new Error('email is not usable');
    }

    const cleanPassword = sanitize(password);

    if (cleanPassword.length < 1) {
      return new Error('password is not usable');
    }

    const userRecord = await getUserByEmail(cleanEmail);

    if (!userRecord) {
      return new Error('user not found');
    }

    const isMatch = await verifyPassword(userRecord.password, cleanPassword);

    if (!isMatch) {
      return new Error('incorrect password');
    }

    const payload = {
      id: userRecord.id,
      email: userRecord.email,
      fullName: userRecord.fullName,
      role: userRecord.role,
      createdOn: userRecord.createdOn,
      modifiedOn: userRecord.modifiedOn,
    };

    const accessExpiresIn = 90000;

    const refreshsExpiresIn = 180000;

    const accessToken = generateToken({payload, expiresIn: accessExpiresIn, secret: accessTokenSecret});

    const refreshToken = generateToken({payload, expiresIn: refreshsExpiresIn, secret: refreshTokenSecret});

    return {success: true, user: userRecord, accessToken: accessToken, refreshToken: refreshToken};
  };
  return UserLogin;
};

export default makeUserLogin;
