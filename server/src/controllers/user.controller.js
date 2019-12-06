const User = require('../models/user.model');


exports.test = function (req, res) {
    res.send('Greetings from the User Test controller!');
};




exports.userCreate = function (req, res) {
    var user = new User(
        {
            name: req.body.name,
            fon: req.body.fon,
            email: req.body.email,
            activity: req.body.activity,
            project: req.body.project,
            transaction: req.body.transaction,
            balance: req.body.balance,
            active: req.body.active

        }
    );

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('User Created successfully')
    })
};




exports.userDetails = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user);
    })
};