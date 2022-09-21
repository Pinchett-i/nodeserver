var express = require('express');
var router = express.Router();
var ProjectsController = require('../controllers/projects_controller')

router.get('/', function (request, response, next) {
  ProjectsController.index(request, response)
});

router.get('/new', function (request, response, next) {
 ProjectsController.newAction(request, response)
});

router.post('/', (request, response) => {
  ProjectsController.create(request, response)
})

router.get('/:id/edit', (request, response) => {
  ProjectsController.edit(request, response)
})

router.get('/:id', (request, response) => {
  ProjectsController.show(request, response)
})

router.post('/:id', (request, response) => {
  ProjectsController.update(request, response)
})

router.get('/:id/delete', (request, response) => {
  ProjectsController.destroy(request, response)
})

module.exports = router
