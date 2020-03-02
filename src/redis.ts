import redis from 'redis';
import {REDIS_PORT} from './config';
import {logger} from './shared/logger';

const opts = {
  port: REDIS_PORT,
  autoResubscribe: true,
  maxRetriesPerRequest: 1,
  enableOfflineQueue: true,
  retryStrategy: function() {
    return 2000;
  },
  reconnectOnError: function(err: { message: string; }) {
    return err.message.startsWith('READONLY');
  },
};

const client = redis.createClient(opts);

client
    .on('connect', () => {
      logger.info(`Redis is Connected on Port ${REDIS_PORT}`);
    })
    .on('ready', () => {
      logger.info(`Redis is Connected on Port ${REDIS_PORT}`);
    })
    .on('error', (e) => {
      logger.error('Redis is ready', e);
    })
    .on('close', () => {
      logger.info('Redis is closed');
    })
    .on('reconnecting', () => {
      logger.info('Redis is reconnecting ...');
    })
    .on('end', () => {
      logger.info('Redis connection is disconnected');
    });

export default client;
