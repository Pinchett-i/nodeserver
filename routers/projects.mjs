import express from "express";
import ProjectsController from "../controllers/projects_controller.mjs";
var router = express.Router();

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

router.get('/:id/hours', (request, response) => {
  ProjectsController.hours(request, response)
})

export default router
