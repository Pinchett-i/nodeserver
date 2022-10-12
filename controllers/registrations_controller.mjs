import ApplicationController from "./application_controller.mjs";
import bcrypt from "bcrypt";
import User from "../models/user.mjs";

class RegistrationsController extends ApplicationController {
  static newAction(request, response) {
    response.render('registrations/new', { title: 'Sign Up', layout: './layouts/application' });
  }

  static async register_user(request, response) {
    let first_name = request.body.first_name;
    let last_name = request.body.last_name;
    let password = request.body.password;
    let password_confirmation = request.body.password_confirmation;
    let email = request.body.email

    if (password !== password_confirmation) {
      request.flash("error", "Passwords don't match")
      response.redirect('/registrations/new')
      return
    }
    try {
      let existing_users = await User.find(
        { "email": email }
      )

      let hashed_password = await bcrypt.hash(password, 10)
      let role = await Role.find({ name: 'viewer' })
      await User.create(
        {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "password": hashed_password,
          "role_id":  role.id
        }
      )
      request.flash("success", "User successfully created")
      response.redirect('/');

    } catch (error) {
      if (error === 'NoMatchFound') {
        request.flash("error", "This user already exists")
        response.redirect('/registrations/new')
        return
      }
    }
  }
}

export default RegistrationsController
