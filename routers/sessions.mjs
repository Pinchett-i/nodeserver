import express from "express";
import SessionsController from "../controllers/sessions_controller.mjs";
var router = express.Router();

router.get('/new', function (request, response, next) {
  SessionsController.newAction(request, response)
});

router.post('/auth', (request, response) => {
  SessionsController.authenticate(request, response);
})

router.post('/destroy', (request, response) => {
  SessionsController.log_out(request, response);
})

export default router
