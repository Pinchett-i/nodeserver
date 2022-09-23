const Company = require('./company')
const Model = require('./model')

class Project extends Model {
  relations() {
    return [Company]
  }
}

module.exports = Project
