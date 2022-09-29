import Model from "./model.mjs";
import Project from "./project.mjs";
import Employee from "./employee.mjs";
class Assignement extends Model {
  relations() {
    return {
      single: [Project, Employee],
      has_many: [],
      has_many_through: [],
    }
  }
}

export default Assignement
