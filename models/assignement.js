const Model = require('./model')

class Assignement extends Model {
  relations() {
    return {
      single: [Index.Project, Index.Employee],
      has_many: [],
      has_many_through: [],
    }
  }
}

module.exports = Assignement
const Index = require('./index')
