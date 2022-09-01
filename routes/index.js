const { request } = require('express');
var express = require('express');
var router = express.Router();


router.get('/', function(request, response, next) {
	if (typeof(request.session.loggedin) === 'undefined') {
		response.render('sessions/new', { title: 'Login', layout: './layouts/application' });
		return
	}
	response.redirect('/home');
});

router.get('/home', (request, response, next) => {
  if (request.session.loggedin) {
		response.render('pages/home', {title: 'Home', layout: './layouts/application', email: request.session.email})
		return 
	}
	response.redirect('/');
})

module.exports = router;
