import Model from "./model.mjs";
import Project from "./project.mjs";
class Company extends Model {
  relations() {
    return {
      single: [],
      has_many: [Project],
      has_many_through: []
    }
  }
}

export default Company
