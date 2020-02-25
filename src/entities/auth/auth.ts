/* eslint-disable max-len */
type makeAuth = {
    verify: Function,
    checkToken: Function,
    sanitize: Function,
    accessTokenSecret: string,
    refreshTokenSecret: string,
}

type authType = {
    accessToken: string,
    refreshToken: string,
}

const makeAuth = ({verify, sanitize, checkToken, accessTokenSecret, refreshTokenSecret}: makeAuth) => {
  const auth = async ({accessToken, refreshToken}: authType) => {
    const validateAccessToken = checkToken({
      token: accessToken,
    });

    if (validateAccessToken) {
      throw new Error(validateAccessToken);
    }

    const validateRefreshToken = checkToken({
      token: refreshToken,
    });

    if (validateRefreshToken) {
      throw new Error(validateRefreshToken);
    }

    const cleanAccessToken = sanitize(accessToken);

    if (cleanAccessToken.length < 1) {
      throw new Error('access Token is not usable');
    }

    const cleanRefreshToken = sanitize(refreshToken);

    if (cleanRefreshToken.length < 1) {
      throw new Error('refresh Token is not usable');
    }

    const accessTokenInfo = await verify(cleanAccessToken, accessTokenSecret);
    const refreshTokenInfo = await verify(cleanRefreshToken, refreshTokenSecret);

    if (accessTokenInfo.role !== 1 || refreshTokenInfo.role !== 1) {
      throw new Error('user must be an admin');
    }

    return true;
  };
  return auth;
};

export default makeAuth;
