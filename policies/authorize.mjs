import Permissions from './permissions.json' assert { type: "json" };
import User from '../models/user.mjs'

function authorize(controller_name, action, current_user_id) {
  let permissions = list_permissions(controller_name, action)
  return validate(permissions, current_user_id);
}

function list_permissions(controller_name, action) {
  let permissions = Permissions[controller_name][action]
  if (typeof(permissions) === 'undefined') { 
    permissions = {
      requires_login: true,
      authorized_roles: ['manager']
    }
  }

  return permissions
}

async function validate(conditions, current_user_id) {
  let current_user = await User.find({ id: current_user_id })

  if (conditions.requires_login && typeof (current_user) === 'undefined') {
    return false
  }

  let current_role = await current_user.role()
  if (conditions.authorized_roles && !conditions.authorized_roles.includes(current_role.name)) {
    return false
  }

  return true
}


export default authorize
