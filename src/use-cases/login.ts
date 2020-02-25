import {userLogin} from '../entities/user';

type MakeLoginArgs = {
    getUserByEmail: Function,
};

type LoginArgs = {
    email: string,
    password: string,
};


const makeLogin = ({getUserByEmail}: MakeLoginArgs) => {
  const login = async ({email, password}: LoginArgs) => {
    const loginResp = await userLogin({email, password, getUserByEmail});
    return loginResp;
  };
  return login;
};

export default makeLogin;
