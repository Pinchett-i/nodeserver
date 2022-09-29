import express from "express";
import SessionsController from "../controllers/sessions_controller.mjs";
var router = express.Router();

router.get('/', function (request, response, next) {
  SessionsController.login(request, response)
});

router.get('/new', function (request, response, next) {
  SessionsController.newAction(request, response)
});

router.post('/auth', (request, response) => {
  SessionsController.authenticate(request, response);
})

export default router
