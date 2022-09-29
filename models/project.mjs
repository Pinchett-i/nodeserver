import Model from "./model.mjs";
import Employee from "./employee.mjs";
import Assignement from "./assignement.mjs";
import Company from './company.mjs';
class Project extends Model {
  relations() {
    return {
      single: [Company],
      has_many: [],
      has_many_through: [{ target: Employee, through: Assignement }]
    }
  }
}

export default Project
