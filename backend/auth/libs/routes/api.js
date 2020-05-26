var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.json({
        msg: 'API is running'
    });
});

router.get('/uInfo', passport.authenticate('bearer', { session: false }),
    function (req, res) {
        res.json({
            id: req.user.userId,
            username: req.user.username,
            permissions: req.user.permissions,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            middlename: req.user.middlename,
            position: req.user.position,
            scope: req.authInfo.scope
        });
    }
);
module.exports = router;
