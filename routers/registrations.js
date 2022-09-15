var express = require('express');
var router = express.Router();
var RegistrationsController = require('../controllers/registrations_controller')


router.get('/new', function (request, response, next) {
  RegistrationsController.newAction(request, response)
});

router.post('/', (request, response) => {
  RegistrationsController.register_user(request, response);
})

module.exports = router;
