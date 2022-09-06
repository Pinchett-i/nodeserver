var express = require('express');
var router = express.Router();

router.get('/', function (request, response, next) {
  response.render('sessions/new', { title: 'Login', layout: './layouts/application' });
});

router.get('/new', function (request, res, next) {
  res.render('sessions/new', {
    title: 'Login',
    layout: './layouts/application'
  });
});

router.post('/auth', (request, response) => {  
  authenticate(request, response);
})

async function authenticate(request, response) {
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

  log_in(request, response, email)
}

function log_in(request, response, email) {
  request.flash("success", "Successfully Logged In")
  request.session.loggedin = true;
  request.session.email = email;
  response.redirect('/home')
}
module.exports = router;
