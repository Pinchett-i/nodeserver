import express from "express";
import HomeController from "../controllers/home_controller.mjs";
var router = express.Router();

router.get('/', function (request, response, next) {
  HomeController.root(request, response)
});

router.get('/home', (request, response, next) => {
  HomeController.home(request, response)
})

export default router;
