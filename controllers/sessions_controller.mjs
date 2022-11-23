import ApplicationController from "./application_controller.mjs";
import bcrypt from "bcrypt";
import User from '../models/user.mjs'
class SessionsController extends ApplicationController {

  static newAction(request, response) {
    response.render('sessions/new', {
      title: 'Login',
      layout: './layouts/logged_out'
    });
  }

  static async authenticate(request, response) {
    let email = request.body.email;
    let password = request.body.password;

    if (email == undefined || password == undefined) {
      request.flash("error", "Missing Email &/OR Password")
      response.redirect('/')
      return
    }

    let user = await User.find(
      { "email": email }
    )
    if (typeof (user) === 'undefined') {
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

  static log_out(request, response) {
    if (request.session) {
      request.session.loggedin = false
      request.session.current_user_id = null
      request.flash("success", "Successfully Logged Out")
      response.redirect('/')
    } else {
      request.flash("error", "You are not logged in")
      response.redirect('/')
    }
  }
}

export default SessionsController
