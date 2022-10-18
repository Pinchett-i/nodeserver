import ApplicationController from "./application_controller.mjs";
import bcrypt from "bcrypt";
import User from '../models/user.mjs'
class SessionsController extends ApplicationController {

  static login(request, response) {
    response.render('sessions/new', { title: 'Login', layout: './layouts/application' });
  }

  static newAction(request, response) {
    response.render('sessions/new', {
      title: 'Login',
      layout: './layouts/application'
    });
  }

  static async authenticate(request, response) {
    let email = request.body.email;
    let password = request.body.password;

    if (typeof(email) === 'undefined' || typeof(password) === 'undefined') {
      request.flash("error", "Missing Email &/OR Password")
      response.redirect('/')
      return
    }

    let user = await User.find(
      { "email": email }
    )

    if (typeof(user.id) === 'undefined') {
      request.flash("error", "Invalid Email")
      response.redirect('/')
      return
    }

    const password_match = await bcrypt.compare(password, user.password)

    if (password_match === false) {
      request.flash("error", "Incorrect Password")
      response.redirect('/')
      return
    }

    this.log_in(request, response, user)
  }

  static log_in(request, response, user) {
    request.flash("success", "Successfully Logged In")
    request.session.loggedin = true;
    request.session.current_user_id = user.id;
    response.redirect('/home')
  }
}

export default SessionsController
