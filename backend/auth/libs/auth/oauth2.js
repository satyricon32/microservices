var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

var libs = process.cwd() + '/libs/';

var config = require(libs + 'config');
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var User = require(libs + 'model/user');
var AccessToken = require(libs + 'model/accessToken');
var RefreshToken = require(libs + 'model/refreshToken');

var aserver = oauth2orize.createServer();

var errFn = function (cb, err) {
    if (err) {
        return cb(err);
    }
};

var generateTokens = function (data, done) {

    var errorHandler = errFn.bind(undefined, done),
        refreshToken,
        refreshTokenValue,
        token,
        tokenValue;

    RefreshToken.deleteMany(data, errorHandler);
    AccessToken.deleteMany(data, errorHandler);

    tokenValue = crypto.randomBytes(32).toString('hex');
    refreshTokenValue = crypto.randomBytes(32).toString('hex');

    data.token = tokenValue;
    token = new AccessToken(data);

    data.token = refreshTokenValue;
    refreshToken = new RefreshToken(data);

    refreshToken.save(errorHandler);

    token.save(function (err) {
        if (err) {

            log.error(err);
            return done(err);
        }
        done(null, tokenValue, refreshTokenValue, {
            'expires_in': config.get('security:tokenLife')
        });
    });
};

aserver.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {

    User.findOne({ username: username }, function (err, user) {

        if (err) {
            return done(err);
        }

        if (!user || !user.checkPassword(password)) {
            return done(null, false);
        }

        var model = {
            userId: user.userId,
            user: user,
            clientId: client.clientId
        };

        generateTokens(model, done);
    });

}));

aserver.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {

    RefreshToken.findOne({ token: refreshToken, clientId: client.clientId }, function (err, token) {
        if (err) {
            return done(err);
        }

        if (!token) {
            return done(null, false);
        }

        User.findById(token.userId, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }

            var model = {
                userId: user.userId,
                user: user,
                clientId: client.clientId
            };

            generateTokens(model, done);
        });
    });
}));

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    aserver.token(),
    aserver.errorHandler()
];
