import Model from "./model.mjs";
import Project from "./project.mjs";
import Assignement from "./assignement.mjs";
class Employee extends Model {
  relations() {
    return {
      single: [],
      has_many: [],
      has_many_through: [{ target: Project, through: Assignement }],
    }
  }
}

export default Employee
