const Model = require('./model')
const Project = require('./project')

class Company extends Model {
  relations() {
    return {
      single: [],
      multiple: [Project]
    }
  }
}

module.exports = Company
