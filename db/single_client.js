const { Client } = require("pg")
let dotenv = require('dotenv').config({ path: 'config/database.env' })
 
const connectDb = async () => {
    try {
        const client = new Client({
            user: dotenv.PGUSER,
            host: dotenv.PGHOST,
            database: dotenv.PGDATABASE,
            password: dotenv.PGPASSWORD,
            port: dotenv.PGPORT
        })
 
        await client.connect()
        const res = await client.query('SELECT * FROM some_table')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}
 
connectDb()
