
import express from "express";
import EmployeesController from "../controllers/employees_controller.mjs";
var router = express.Router();

router.get('/', function (request, response, next) {
  EmployeesController.index(request, response)
});

router.get('/new', function (request, response, next) {
  EmployeesController.newAction(request, response)
});

router.post('/', (request, response) => {
  EmployeesController.create(request, response)
})

router.get('/:id/edit', (request, response) => {
  EmployeesController.edit(request, response)
})

router.get('/:id', (request, response) => {
  EmployeesController.show(request, response)
})

router.post('/:id', (request, response) => {
  EmployeesController.update(request, response)
})

router.get('/:id/delete', (request, response) => {
  EmployeesController.destroy(request, response)
})


export default router;
