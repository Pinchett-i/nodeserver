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
		// Output username
		response.send('Welcome back, ' + request.session.email + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
})

module.exports = router;
