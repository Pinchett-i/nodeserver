var express = require('express');
var router = express.Router();
var HomeController = require('../controllers/home_controller')

router.get('/', function(request, response, next) {
	HomeController.root(request, response)
});

router.get('/home', (request, response, next) => {
  HomeController.home(request, response)
})

module.exports = router;
