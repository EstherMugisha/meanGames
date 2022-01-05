const express = require("express"); 
const router = express.Router();
const gameController= require ('../controllers/game-controllers.js');
const publisherController= require('../controllers/publisher-controllers.js');
const reviewsController=require('../controllers/reviews-controller.js')
const usersControllers=require("../controllers/user-controllers")

router.route("/games")
.get(usersControllers.authenticate, gameController.gamesGetAll)
.post(gameController.gamesAddOne)

router.route("/games/:gameId")
.get(gameController.gamesGetOne)
.delete(gameController.gamesDeleteOne)
.put(gameController.gamesUpdateOne)

router.route("/games/:gameId/publisher")
.get(publisherController.getPublisher)
.post(publisherController.publisherAdd)
.put(publisherController.updatePublisher)
.delete(publisherController.publisherDelete)

router.route("/games/:gameId/reviews")
.get(reviewsController.reviewsGetAll)
.post(reviewsController.reviewAddOne)


router.route("/games/:gameId/reviews/:reviewId")
.get(reviewsController.reviewsGetOne)
.put(reviewsController.reviewUpdateOne)
.delete(reviewsController.reviewDelete)

router.route("users")
.post(usersControllers.register)

router.route("users/login")
.post(usersControllers.login)



module.exports = router;