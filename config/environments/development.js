
let config = {
  "db": {
    "user": process.env.DB_USER || "nodeserver",
    "password": process.env.DB_PASSWORD,
    "host": process.env.DB_HOST || "localhost",
    "port": process.env.DB_PORT || 5432,
    "database": process.env.DB_NAME || "nodeserver_development",
    "threads": process.env.DB_THREADS || 5,
    "system": process.env.DB_SYSTEM || "postgres"
  }
}

module.exports = config
