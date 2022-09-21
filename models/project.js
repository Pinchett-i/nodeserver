const Company = require('./company')
const Model = require('./model')

class Project extends Model {
  async company() {
    return await Company.find({id: this.company_id})
  }
}

module.exports = Project
