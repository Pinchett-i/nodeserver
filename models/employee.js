const Model = require('./model')
class Employee extends Model {
  relations() {
    return {
      single: [],
      has_many: [],
      has_many_through: [ {target: Index.Project, through: Index.Assignement } ],
    }
  }
}

module.exports = Employee

const Index = require('./index')
