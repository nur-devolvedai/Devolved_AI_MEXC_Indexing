module.exports = {
    apps: [
      {
        name: "mexc_indexing_frontend",
        script: "npm",
        args: "start",
        autorestart: true,
        time: true,
        restart_delay: 3000,
        watch: true,
        ignore_watch: [ "node_modules", "logs" ],
        max_memory_restart: "1G",
        log_date_format: "YYYY-MM-DD HH:mm Z"
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
        error_file: './logs/listner-error.log',
        out_file: './logs/listner-out.log',
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
        },
      }
    ],
  };