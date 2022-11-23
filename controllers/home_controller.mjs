import ApplicationController from "./application_controller.mjs";
class HomeController extends ApplicationController {
	static async root(request, response) {
		if (typeof (request.session.loggedin) === 'undefined' || request.session.loggedin == false) {
			response.render('sessions/new', { title: 'Login', layout: './layouts/logged_out' });
			return
		}
		response.redirect('/home');
	}

	static async home(request, response) {
		if (request.session.loggedin == true) {
			response.render('pages/home', { title: 'Home', layout: './layouts/application', email: request.session.email })
			return
		}
		response.redirect('/');
	}
}

export default HomeController
