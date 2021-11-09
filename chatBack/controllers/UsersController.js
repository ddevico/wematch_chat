const Users = require('../models/Users');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
    createUser: (req, res) => {
        try {
            Users.find({ 'userName': req.body.userName }, function (err, user) {
                if (user.length == 0) {
                    const createUser = new Users({
                        userName: req.body.userName,
                        password: bcrypt.hashSync(req.body.password, saltRounds),
                    });
                    createUser.save(function (err, user) {
                        if (err) {
                            res.sendStatus(404);
                        }
                        res.json(user);
                    })
                }
                else {
                    res.sendStatus(404);
                }
            })
        }
        catch (e) {
            console.log(e)
        }
    },
    getUser: (req, res) => {
        try {
            Users.find({ userName: req.body.userName }, (err, user) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                    return;
                }
                if (user.length > 0) {
                    var isTrue = bcrypt.compareSync(req.body.password, user[0].password);
                    if (isTrue) {
                        var jsonReturn = {
                            id: user[0]._id,
                            userName: user[0].restaurantName,
                        }
                        res.json(jsonReturn);
                    }
                    else {
                        res.sendStatus(404);
                    }
                }
                else {
                    res.sendStatus(404);
                }
            });
        }
        catch (e) {
            console.log(e)
        }
    },
};