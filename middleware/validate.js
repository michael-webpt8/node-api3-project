const userDb = require('../users/userDb');

function validateUserId() {
    return (req, res, next) => {
        userDb.getById(req.params.id)
            .then(user => {
                if (user) {
                    req.user = user;
                    next()
                } else {
                    res.status(400).json({ message: "Invalid user id" })
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: "Error getting User" })
            })
    }
}

function validateUser() {
    return (req, res, next) {
        if (!req.body.name) {
            return res.status(400).json({ message: "missing user data" })
        }
        next();
    }
}

function validatePost() {
    return (req, res, next) {
        if (!req.body.text) {
            return res.status(400).json({ message: "missing required text field" })
        }
        next();
    }
}

module.exports = {
    validateUserId,
    validateUser,
    validatePost
}