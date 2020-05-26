var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';

var router = express.Router();

var log = require(libs + 'log')(module);
var config = require(libs + 'config');

var db = require(libs + 'db/mongoose');
var User = require(libs + 'model/user');

router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    User.find(function (err, users) {
        if (!err) {
            log.info('Get users')
            return res.json(users);
        } else {
            res.statusCode = 500;

            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error:  err.message
            });
        }
    })

})


router.post('/', passport.authenticate('bearer', { session: false }), function (req, res) {

    var user = new User({
        username: req.body.username,
        permissions: req.body.permissions,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        middlename: req.body.middlename,
        position: req.body.position,
        password: req.body.password,
        role: req.body.role,
    });

    user.save(function (err) {
        if (!err) {
            log.info("New user created with id: %s", user.id);
            return res.json({
                status: 'OK',
                data: user
            });
        } else {
            if (err.name === 'ValidationError') {
                res.statusCode = 400;
                res.json({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;

                log.error('Internal error(%d): %s', res.statusCode, err.message);

                res.json({
                    error: err.message
                });
            }
        }
    })
})


router.get('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {

    User.findById(req.params.id, function (err, user) {

        if (!user) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return res.json({
                status: 'OK',
                data: user
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error:  err.message
            });
        }
    });
});
router.delete('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {

    User.findByIdAndRemove(req.params.id, function (err, user) {

        if (!user) {
            res.statusCode = 404;

            return res.json({
                error: 'Not found'
            });
        }

        if (!err) {
            return 'success'
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);

            return res.json({
                error:  err.message
            });
        }
    });
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res) {
    var userId = req.params.id;

    User.findById(userId, function (err, user) {
        if (!user) {
            res.statusCode = 404;
            log.error('User with id: %s Not Found', userId);
            return res.json({
                error: 'Not found'
            });
        }
            for(var i in req.body) {
                user[i] = req.body[i]
            }

            user.save(function (err) {
                if (!err) {
                    log.info("User with id: %s updated", user.id);
                    return res.json({
                        status: 'OK',
                        data: user
                    });
                } else {
                    if (err.name === 'ValidationError') {
                        res.statusCode = 400;
                        return res.json({
                            error: 'Validation error'
                        });
                    } else {
                        res.statusCode = 500;

                        return res.json({
                            error:  err.message
                        });
                    }
                }
            });
    });
});


module.exports = router;
