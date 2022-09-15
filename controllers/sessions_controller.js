var ApplicationController = require('./application_controller')

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
    let db = request.app.get('db')
    let email = request.body.email;
    let password = request.body.password;

    if (email == undefined || password == undefined) {
      request.flash("error", "Missing Email &/OR Password")
      response.redirect('/')
      return
    }

    let results = await db.search(
      'users',
      { "email": email }
    )

    if (results.rowCount == 0) {
      request.flash("error", "Invalid Email")
      response.redirect('/')
      return
    }

    if (results.rows[0].password != password) {
      request.flash("error", "Incorrect Password")
      response.redirect('/')
      return
    }

    this.log_in(request, response, email)
  }

  static log_in(request, response, email) {
    request.flash("success", "Successfully Logged In")
    request.session.loggedin = true;
    request.session.email = email;
    response.redirect('/home')
  }
}

module.exports = SessionsController
