type makeGetUserType = {
  getUser: any,
  auth: any,
}

type getUserType = {
  id: string,
  accessToken: string,
  refreshToken: string
}

const makeGetUserById = ({getUser, auth}: makeGetUserType) => {
  const GetUserById = async ({id, accessToken, refreshToken}: getUserType) => {
    await auth({accessToken, refreshToken});

    const result = await getUser(id);

    return result;
  };
  return GetUserById;
};

export default makeGetUserById;
