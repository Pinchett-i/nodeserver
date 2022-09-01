var express = require('express');
var router = express.Router();
const {
  Pool
} = require("pg");
const pool = new Pool()

router.get('/', function (request, res, next) {
  res.render('sessions/new', {
    title: 'Login',
    layout: './layouts/application'
  });
});

router.get('/new', function (request, res, next) {
  res.render('sessions/new', {
    title: 'Login',
    layout: './layouts/application'
  });
});

router.post('/auth', (request, response) => {

  var email = request.body.email;
  var password = request.body.password;

  if (email && password) {
    let email_search_query = {
      text: 'SELECT * FROM users WHERE users.email = $1',
      values: [email]
    }

    pool.query(email_search_query, (error, results) => {
      if (error) {
        console.error(error.stack)
        return
      }

      if (results.rowCount == 0) {
        response.send('Invalid Email');
        return
      }

      if (results.rows[0].password != password) {
        response.send('Incorrect Password');
        return
      }

      request.session.loggedin = true;
      request.session.email = email;
      response.redirect('/home');
    })
  }
});

module.exports = router;
