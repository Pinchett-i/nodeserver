const Model = require('./model')

class Project extends Model {
  relations() {
    return {
      single: [Index.Company],
      has_many: [],
      has_many_through: [{target: Index.Employee, through: Index.Assignement}]
    }
  }
}

module.exports = Project
const Index = require('./index')
