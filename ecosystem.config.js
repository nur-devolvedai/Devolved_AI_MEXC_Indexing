module.exports = {
    apps: [
      {
        name: 'fetchChainData',
        script: 'fetchChainData.js',
        watch: false,
        autorestart: true,
        restart_delay: 5000,
        env: {
          NODE_ENV: 'development',
          POSTGRES_DB: process.env.POSTGRES_DB,
          POSTGRES_USER: process.env.POSTGRES_USER,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
          DATABASE_URL: process.env.DATABASE_URL,
          ARGOCHAIN_RPC_URL: process.env.ARGOCHAIN_RPC_URL,
        },
        env_production: {
          NODE_ENV: 'production',
          POSTGRES_DB: process.env.POSTGRES_DB,
          POSTGRES_USER: process.env.POSTGRES_USER,
          POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
          DATABASE_URL: process.env.DATABASE_URL,
          ARGOCHAIN_RPC_URL: process.env.ARGOCHAIN_RPC_URL,
        }
      }
    ]
  };
  