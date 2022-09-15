var express = require('express');
var router = express.Router();
var CompaniesController = require('../controllers/companies_controller')

router.get('/', function (request, response, next) {
  CompaniesController.index(request, response)
});

router.get('/new', function (request, response, next) {
 CompaniesController.newAction(request, response)
});

router.post('/', (request, response) => {
  CompaniesController.create(request, response)
})

router.get('/:id/edit', (request, response) => {
  CompaniesController.edit(request, response)
})

router.get('/:id', (request, response) => {
  CompaniesController.show(request, response)
})

router.post('/:id', (request, response) => {
  CompaniesController.update(request, response)
})

router.get('/:id/delete', (request, response) => {
  CompaniesController.destroy(request, response)
})

module.exports = router
