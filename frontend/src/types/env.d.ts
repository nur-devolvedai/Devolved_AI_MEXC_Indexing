declare namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_DB: string;
      DATABASE_URL: string;
      RPC_NODE_URL: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
    }
  }
  