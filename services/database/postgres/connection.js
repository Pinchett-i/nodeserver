const { Pool, Client } = require('pg')

class PostgresConnection {
  constructor(config) {
    this.config = config
    this.client = this.getClient(config)
  }

  async search(table, fields, joins) {
    let fields_values = Object.values(fields)
    let results = await this.client.query(this.get_search_query_string(table, fields), fields_values)
    return this.parseResults(results)
  }

  async joint_search(table, fields, joins) {
    let fields_values = Object.values(fields)
    let results = await this.client.query(this.get_search_query_string(table, fields, joins), fields_values)
  }

  async insert(table, fields) {
    let fields_values = Object.values(fields)
    let results = await this.client.query(this.get_insert_query_string(table, fields), fields_values)
    return this.parseResults(results)
  }

  async update(table, fields, _id) {
    let fields_values = Object.values(fields)
    let results = await this.client.query(this.get_update_query_string(table, fields, _id), fields_values)
    return this.parseResults(results)
  }

  async delete(table, ids) {
    let results = await this.client.query(this.get_delete_query_string(table, ids))
    return this.parseResults(results)
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

  get_search_query_string(table, fields, _joins) {
    let fields_keys = Object.keys(fields)
    if (fields_keys.length == 0) { return `SELECT * FROM ${table}` }

    let str = `SELECT * FROM ${table} WHERE ${fields_keys[0]} = $1`

    for (let index = 1; index < fields_keys.length; index++) {
      let key = fields_keys[index]
      str += `AND ${key} = $${index + 1}`
    }

    if (typeof(_joins) !== undefined) {
      for (join in _joins) {
        str += `JOIN "${join.table}" ON "${join.table}"."id" = "${table}"."${join.foreign_key}"`
      }
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

  get_update_query_string(table, fields, _id) {
    let fields_keys = Object.keys(fields)
    if (fields_keys.length == 0) return

    let str = `UPDATE ${table} SET `
    str += fields_keys.map((key, index) => { return `${key} = $${index + 1}` }).join(', ')

    if (_id == null) { return str }

    str += ` WHERE id = ${_id}`

    return str
  }

  get_delete_query_string(table, ids) {
    let str = `DELETE FROM ${table}`
    if (ids.length === 0) return str

    str += ` WHERE id IN (${ids.join()})`

    return str
  }

  parseResults(results) {
    if (results.rowCount == 0) {
    // TODO  hhandle search with no match gracefully
      //  throw 'NoMatchFound'
    }
    return results.rows
  }
}

module.exports = PostgresConnection
