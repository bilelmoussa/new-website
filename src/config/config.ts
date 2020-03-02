/* eslint-disable max-len */
import {config} from 'dotenv';
config();

const dbServer: string = String(process.env.DB_ENV) || 'development';
const port: number = Number(process.env.PORT) || 5000;
const accessTokenSecret: string = String(process.env.ACCESS_TOKEN_SECRET) || 'accessTokenSecret';
const refreshTokenSecret: string = String(process.env.REFRESH_TOKEN_SECRET) || 'refreshTokenSecret';
const REDIS_PORT: number = Number(process.env.REDIS_PORT) || 6379;
const RedisSecret: string = String(process.env.REDIS_SECRET) || 'redissecret';

export {dbServer, port, accessTokenSecret, refreshTokenSecret, REDIS_PORT, RedisSecret};
