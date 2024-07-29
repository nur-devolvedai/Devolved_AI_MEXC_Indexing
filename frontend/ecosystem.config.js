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
    ],
  };