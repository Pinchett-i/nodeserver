const ApplicationController = require('./application_controller')
const bcrypt = require("bcrypt")

class RegistrationsController extends ApplicationController {

  static newAction(request, response) {
    response.render('registrations/new', { title: 'Sign Up', layout: './layouts/application' });
  }

  static async register_user(request, response) {
    let db = request.app.get('db')
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
      let users = await db.search(
        'users',
        { "email": email }
      )
  
      let hashed_password = await bcrypt.hash(password, 10)
  
      db.insert(
        'users',
        {
          "first_name": first_name,
          "last_name": last_name,
          "email": email,
          "password": hashed_password,
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

module.exports = RegistrationsController
