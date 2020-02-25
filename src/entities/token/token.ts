/* eslint-disable max-len */
type TokenArgs = {
    payload: any,
    expiresIn: Number,
    secret: string,
}

type GenerateTokenArgs = {
    sign: Function,
}

const makeGenerateAccessToken = ({sign}: GenerateTokenArgs) => {
  const generateAccessToken = ({payload, expiresIn, secret}: TokenArgs) => {
    const token = sign(payload, secret, {expiresIn});
    return token;
  };
  return generateAccessToken;
};

export default makeGenerateAccessToken;
