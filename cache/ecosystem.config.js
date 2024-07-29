module.exports = {
    apps: [
      {
        name: 'listener',
        script: "npm",
        args: "start",
        watch: true,
        ignore_watch: [ "node_modules", "logs" ],
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
          REDIS_HOST: process.env.REDIS_HOST,
          REDIS_PORT: process.env.REDIS_PORT,
        },
        env_production: {
          NODE_ENV: 'production',
          REDIS_HOST: process.env.REDIS_HOST,
          REDIS_PORT: process.env.REDIS_PORT,
        },
      }
    ],
  };