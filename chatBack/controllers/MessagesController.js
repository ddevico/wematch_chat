const Messages = require('../models/Messages');

module.exports = {
    addMessage: (req, res) => {
        try {
            const document = {
                userName: req.body.userName,
                text: req.body.message,
                channel: req.body.channelName
            };
            const message = new Messages(document);
            message.save(function (err, message) {
                if (err) {
                    res.status(500).json({
                        errors: err
                    });
                    return;
                }
                res.status(201).json(message);
            });
        }
        catch (e) {
            console.log(e)
        }
    },
    getMessage: (req, res) => {
        try {
            Messages.find({ channel: req.params.channelName }, (err, messages) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                    return;
                }
                res.status(200).send(messages);
            });
        }
        catch (e) {
            console.log(e)
        }
    },
    updateMessage: (req, res) => {
        try {
            console.log(req.params.id, req.body)
            Messages.findByIdAndUpdate(req.params.id,
                { $set: { text: req.body.message } }, (err, messages) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                        return;
                    }
                    res.status(200).send(messages);
                });
        }
        catch (e) {
            console.log(e)
        }
    }
};