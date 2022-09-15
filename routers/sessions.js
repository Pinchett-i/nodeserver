var express = require('express');
var router = express.Router();
var SessionsController = require('../controllers/sessions_controller')

router.get('/', function (request, response, next) {
  SessionsController.login(request, response)
});

router.get('/new', function (request, response, next) {
  SessionsController.newAction(request, response)
});

router.post('/auth', (request, response) => {  
  SessionsController.authenticate(request, response);
})

module.exports = router
