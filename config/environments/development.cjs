
let config = {
  "db": {
    "user": process.env.DB_USER || "nodeserver",
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 5432,
    "database": process.env.DB_NAME || "nodeserver_development",
    "threads": process.env.DB_THREADS || 5,
    "system": process.env.DB_SYSTEM || "postgres"
  },
  "app": {
    "port": process.env.APP_PORT || 3001,
  },
  "timemanager": {
    "host": process.env.TIMEMANAGER_HOST || "localhost",
    "port": process.env.TIMEMANAGER_PORT || 3000,
    "headers": {
      "AUTHORIZATION": process.env.TIMEMANAGER_KEY
    },
    "protocol": process.env.TIMEMANAGER_PROTOCOL || "http:"
  }
}

module.exports = config;
