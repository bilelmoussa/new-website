/* eslint-disable max-len */
import {dbServer, port, accessTokenSecret, refreshTokenSecret, REDIS_PORT, RedisSecret} from './config';

const configServices = Object.freeze({
  dbServer,
  port,
  accessTokenSecret,
  refreshTokenSecret,
  REDIS_PORT,
  RedisSecret,
});

export default configServices;
export {dbServer, port, accessTokenSecret, refreshTokenSecret, REDIS_PORT, RedisSecret};
