const { Pool } = require("pg");
let dotenv = require('dotenv').config({ path: 'config/database.env' })

        const pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        });
