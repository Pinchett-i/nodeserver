import Model from "./model.mjs";
import Role from './role.mjs';

class User extends Model {
  relations() {
    return {
      single: [Role],
      has_many: [],
      has_many_through: []
    }
  }
}

export default User
