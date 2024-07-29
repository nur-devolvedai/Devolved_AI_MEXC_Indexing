module.exports = {
    apps: [
      {
        name: 'fetchChainData',
        script: 'fetchChainData.js',
        node_args: '--max-old-space-size=2048',
        watch: false,
        autorestart: true,
        // max_restarts: 10,
        restart_delay: 5000,
        min_uptime: 10000,
        exec_mode: 'cluster',
        instances: 1,
        error_file: './logs/fetchChainData-error.log',
        out_file: './logs/fetchChainData-out.log',
        combine_logs: true,
        env: {
          NODE_ENV: 'development',
          POSTGRES_DB: process.env.POSTGRES_DB,
          POSTGRES_USER: process.env.POSTGRES_USER,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
          DATABASE_URL: process.env.DATABASE_URL,
          ARGOCHAIN_RPC_URL: process.env.ARGOCHAIN_RPC_URL,
          FETCHING_BATCH_SIZE: process.env.FETCHING_BATCH_SIZE,
        },
        env_production: {
          NODE_ENV: 'production',
          POSTGRES_DB: process.env.POSTGRES_DB,
          POSTGRES_USER: process.env.POSTGRES_USER,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
          DATABASE_URL: process.env.DATABASE_URL,
          ARGOCHAIN_RPC_URL: process.env.ARGOCHAIN_RPC_URL,
          FETCHING_BATCH_SIZE: process.env.FETCHING_BATCH_SIZE,
        }
      },
      {
      name: 'listener',
      script: 'listener.js',
      watch: false,
      autorestart: true,
      restart_delay: 5000,
      min_uptime: 10000,
      exec_mode: 'cluster',
      instances: 1,
      error_file: './logs/listener-error.log',
      out_file: './logs/listener-out.log',
      combine_logs: true,
      env: {
        NODE_ENV: 'development',
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_DB: process.env.POSTGRES_DB,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PORT: process.env.POSTGRES_PORT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
      },
      env_production: {
        NODE_ENV: 'production',
        POSTGRES_USER: process.env.POSTGRES_USER,
        POSTGRES_DB: process.env.POSTGRES_DB,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_HOST: process.env.POSTGRES_HOST,
        POSTGRES_PORT: process.env.POSTGRES_PORT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_PORT: process.env.REDIS_PORT,
      }
    }
    ]
  };
  