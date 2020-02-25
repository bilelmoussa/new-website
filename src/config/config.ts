import {config} from 'dotenv';
config();

const dbServer:string = String(process.env.DB_ENV);
const port:number = Number(process.env.PORT) || 5000;
const accessTokenSecret: string = String(process.env.ACCESS_TOKEN_SECRET);
const refreshTokenSecret: string = String(process.env.REFRESH_TOKEN_SECRET);

export {dbServer, port, accessTokenSecret, refreshTokenSecret};
