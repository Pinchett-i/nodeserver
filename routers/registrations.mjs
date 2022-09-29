import express from "express";
import RegistrationsController from "../controllers/registrations_controller.mjs";

var router = express.Router();

router.get('/new', function (request, response, next) {
  RegistrationsController.newAction(request, response)
});

router.post('/', (request, response) => {
  RegistrationsController.register_user(request, response);
})

export default router;
