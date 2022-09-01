var express = require('express');
const bcrypt = require("bcrypt")
const { Pool } = require("pg");
const pool = new Pool()
var router = express.Router();


router.get('/new', function (req, res, next) {
  res.render('registrations/new', {
    title: 'Sign up',
    layout: './layouts/application'
  });
});

router.post('/', (request, response) => {
  let first_name = request.body.first_name;
  let last_name = request.body.last_name;
  let password = request.body.password;
  let password_confirmation = request.body.password_confirmation;
  let email = request.body.email

  if (password !== password_confirmation) throw error

  pool.connect((err, client, done) => {
    const shouldAbort = err => {
      if (err) {
        console.error('Error in transaction', err.stack)
        client.query('ROLLBACK', err => {
          if (err) {
            console.error('Error rolling back client', err.stack)
          }
          done()
        })
      }
      return !!err
    }
    client.query('BEGIN', err => {
      if (shouldAbort(err)) return

      const queryText = 'SELECT * FROM users WHERE email = $1'
      client.query(queryText, [email], (err, res) => {
        if (shouldAbort(err)) return

        const insertUserText = 'INSERT INTO users(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING *'
        const insertUserValues =  [first_name, last_name, email, password]
        client.query(insertUserText, insertUserValues, (err, res) => {
          if (shouldAbort(err)) return

          client.query('COMMIT', err => {
            if (err) {
              console.error('Error committing transaction', err.stack)
            }
            done()
          })
        })
      })
    })
  })
  response.redirect('/');
})
module.exports = router;
