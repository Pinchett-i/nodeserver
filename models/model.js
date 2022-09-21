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
    return new this(results[0])
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

  belongs_to(models) {
    models.forEach(model => {
      this.define_relation_getter(model)
    })
  }

  relations() {
    return []
  }

  async define_relation_getter(model) {
    let function_name = model.name.toLowerCase()
    let foreign_key = `${function_name}_id`

    this[function_name] = function () {
       return model.find({id: this[foreign_key]})
    }
  }
}

module.exports = Model
