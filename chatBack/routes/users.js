var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/UsersController');

router
    .route('/getUser')
    .post(UsersController.getUser)

router
    .route('/createUser')
    .post(UsersController.createUser)

module.exports = router;
