const { Pool, Client } = require('pg')

class PostgresConnection {
  constructor(config) {
    this.config = config
    this.client = this.getClient(config)
  }

  search(table, fields) {
    let fields_values = Object.values(fields)
    return this.client.query(this.get_search_query_string(table, fields), fields_values)
  }

  insert(table, fields) {
    let fields_values = Object.values(fields)
    return this.client.query(this.get_insert_query_string(table, fields), fields_values)
  }

  //  PRIVATE

  getClient(config) {
    let threadCount = config.get('db.threads')
    if (threadCount > 1) {
      return new Pool({
        user: config.get('db.user'),
        host: config.get('db.host'),
        database: config.get('db.database'),
        password: config.get('db.password'),
        port: config.get('db.port'),
        max: config.get('db.threads')
      });
    } else {
      return new Client({
        user: config.get('db.user'),
        host: config.get('db.host'),
        database: config.get('db.database'),
        password: config.get('db.password'),
        port: config.get('db.port'),
      });
    }
  }

  get_search_query_string(table, fields) {
    let fields_keys = Object.keys(fields)
    if (fields_keys.length == 0) return

    let str = `SELECT * FROM ${table} WHERE ${fields_keys[0]} = $1`
    if (fields_keys.length == 1) {
      return str
    }

    for (let index = 1; index < fields_keys.length; index++) {
      let key = fields_keys[index]
      str += `AND ${key} = $${index + 1}`
    }
    return str
  }

  get_insert_query_string(table, fields) {
    let fields_keys = Object.keys(fields)
    if (fields_keys.length == 0) return
    let str = `INSERT INTO ${table}(${fields_keys.join(', ')}) VALUES (${this.get_values_indexes_string(fields_keys)}) RETURNING *`
    return str
  }

  get_values_indexes_string(fields_keys) {
    return fields_keys.map(function (key, index) {
      return `$${index + 1}`;
    }).join(', ');
  }
}

module.exports = PostgresConnection
