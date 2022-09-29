const ApplicationController = require('./application_controller')

class HomeController extends ApplicationController {
	static async root(request, response) {
		if (typeof (request.session.loggedin) === 'undefined') {
			response.render('sessions/new', { title: 'Login', layout: './layouts/application' });
			return
		}
		response.redirect('/home');
	}

	static async home(request, response) {
		if (request.session.loggedin) {
			response.render('pages/home', {title: 'Home', layout: './layouts/application', email: request.session.email})
			return 
		}
		response.redirect('/');
	}
}

module.exports = HomeController
