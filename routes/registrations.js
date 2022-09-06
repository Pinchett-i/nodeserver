var express = require('express');
const bcrypt = require("bcrypt")
var router = express.Router();


router.get('/new', function (request, response, next) {
  response.render('registrations/new', { title: 'Sign Up', layout: './layouts/application' });
});

router.post('/', (request, response) => {
  register_user(request, response);
})

async function register_user(request, response) {
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

  let users = await db.search(
    'users',
    { "email": email }
  )

  if (users.rowCount > 0) {
    request.flash("error", "This user already exists")
    response.redirect('/registrations/new')
    return
  } 

  db.insert(
    'users',
    {
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "password": password,
    }
  )
  request.flash("success", "User successfully created")
  response.redirect('/');
}

module.exports = router;
