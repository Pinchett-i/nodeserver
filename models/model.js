const Pluralize = require('pluralize');
var { dbConnection } = require('../services/database/database_service');
class Model {
  constructor(attributes) {
    for (let key in attributes) {
      this[key] = attributes[key]
    }
    this.belongs_to(this.relations)
  }

  static db() {
    return dbConnection
  }

  static table() {
    return Pluralize(this.name).toLowerCase()
  }

  static async all() {
    let results = await this.db().search(
      this.table(),
      {}
    )

    return results.map(x => new this(x))
  }

  static async where(attributes) {
    let results = await this.db().search(
      this.table(),
      attributes
    )

    return results.map(x => new this(x))
  }

  static async create(attributes) {
    let results = await this.db().insert(this.table(), attributes)
    return new this(attributes)
  }

  static async find(attributes) {
    let results = await this.db().search(
      this.table(),
      attributes
    )

    let company = new this(results[0])
    return company
  }

  async update(attributes) {
    let results = await this.constructor.db().update(
      this.constructor.table(),
      attributes,
      this.id
    )

    return new this.constructor(results[0])
  }

  async destroy() {
    await this.constructor.db().delete(
      this.constructor.table(),
      [this.id]
    )

    return this
  }

  validate() {
    throw 'undefinedMethod'
  }

  belongs_to(model_names) {
    model_names.forEach(model => {
      this.define_relation_getter(model_name)
    })
  }

  async define_relation_getter(model_name) {
    let function_name = model_name.toLowerCase()
    let foreign_key = `${function_name}_id`
    let table_name = Pluralize(function_name).toLowerCase()

    this[function_name] = async function () {
      let results = await this.constructor.db().search(
        table_name,
        { id: this[foreign_key] }
      )
      return results[0]
    }
  }
}

module.exports = Model
