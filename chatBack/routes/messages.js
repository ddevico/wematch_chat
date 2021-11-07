var express = require('express');
var router = express.Router();
const MessagesController = require('../controllers/MessagesController');

router
    .route('/addMessage')
    .post(MessagesController.addMessage)

router
    .route('/getMessages/:channelName')
    .get(MessagesController.getMessage)

router
    .route('/updateMessage/:id')
    .put(MessagesController.updateMessage)

module.exports = router;
