const Model = require('./model')

class Company extends Model {
  relations() {
    return {
      single: [],
      has_many: [Index.Project],
      has_many_through: []
    }
  }
}

module.exports = Company

const Index = require('./index')
