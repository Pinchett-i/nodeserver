import Role from "../models/role.mjs";

async function seedRoles() {
  let roles = [
    'manager',
    'viewer'
  ]
  
  roles.forEach(async role => {
    let result = await Role.find({name: role})
    
    if (result && typeof(result.id) !== 'undefined') { return }
    
    await Role.create({
      name: role
    })
  }); 
}

export default seedRoles
