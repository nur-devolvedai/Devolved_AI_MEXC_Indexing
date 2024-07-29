// redisClient.ts

import { createClient } from 'redis';

let client: any;

export const getClient = () => {
  if (!client) {
    client = createClient({
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    });

    client.on('error', (err: any) => {
      console.error('Redis client error', err);
    });

    client.connect().catch(console.error);
  }

  return client;
};
