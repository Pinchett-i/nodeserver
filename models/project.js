const Company = require('./company')
const Model = require('./model')

class Project extends Model {
  relations() {
    return {
      single: [Company],
      multiple: []
    }
  }
}

module.exports = Project
