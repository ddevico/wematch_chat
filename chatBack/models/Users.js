var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Users = new Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('Users', Users);
