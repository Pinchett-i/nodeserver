import User from "../models/user.mjs";
import Role from "../models/role.mjs";
import bcrypt from "bcrypt";

async function seedUsers() {
  let manager = await Role.find({ name: 'manager' })
  let viewer = await Role.find({ name: 'viewer' })
  let users = [
    {
      first_name: 'manager',
      last_name: 'bp',
      email: 'sebastien.pinchetti@blue-planet.be',
      password: await bcrypt.hash('123456', 10),
      role_id: manager.id
    },
    {
      first_name: 'viewer',
      last_name: 'bp',
      email: 'sebastien.pinchetti+viewer@blue-planet.be',
      password: await bcrypt.hash('123456', 10),
      role_id: viewer.id
    }
  ]

  users.forEach(async user => {
    let result = await User.find({ email: user.email })
    
    if (result && typeof(result.id) !== 'undefined') { return }

    await User.create(user)
  });

}

export default seedUsers
