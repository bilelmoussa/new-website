import {dbServer, port, accessTokenSecret, refreshTokenSecret} from './config';

const configServices = Object.freeze({
  dbServer,
  port,
  accessTokenSecret,
  refreshTokenSecret,
});

export default configServices;
export {dbServer, port, accessTokenSecret, refreshTokenSecret};
