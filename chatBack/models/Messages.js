var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Messages = new Schema({
    userName: { type: String, required: true },
    text: { type: String, required: true },
    channel: { type: String, required: true },
});

module.exports = mongoose.model('Messages', Messages);
