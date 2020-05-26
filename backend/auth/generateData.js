var faker = require('faker');

var libs = process.cwd() + '/libs/';

var log = require(libs + 'log')(module);
var db = require(libs + 'db/mongoose');
var config = require(libs + 'config');

var User = require(libs + 'model/user');
var Client = require(libs + 'model/client');
var AccessToken = require(libs + 'model/accessToken');
var RefreshToken = require(libs + 'model/refreshToken');
function crud(name) {
    return [name, 'create-' + name, 'read-' + name, 'update-' + name, 'delete-' + name]
}
const roles = {
    admin: {
        title: "Админинстратор",
        name: 'admin',
        permissions: ['admin', 'register', 'accounter', 'tester', 'dashboard', ...crud('users'), ...crud('roles'), ...crud('patients'), ...crud('bills')]
    },
    register: {
        title: "Регистратор",
        name: 'register',
        permissions: ['register', ...crud('patients'),]
    },
    accounter: {
        title: "Бухгалтер",
        name: 'accounter',
        permissions: ['accounter', ...crud('bills')]
    },
    tester: {
        title: "Тестировщик",
        name: 'tester',
        permissions: ['tester'],
    },
    test: {
        title: "Тестовый аккаунт",
        name: 'tester',
        permissions: ['tester'],
    }
}
User.deleteMany({}, function (err) {
    config.get('default:users').forEach(element => {
        var user = new User({
            ...element,
            permissions: roles[element.username].permissions,
            role: roles[element.username].title,
        });
        user.save(function (err, user) {
            if (!err) {
                log.info('New user - %s:%s', user.username, user.password);
            } else {
                return log.error(err);
            }
        });
    });
});

Client.deleteMany({}, function (err) {
    var client = new Client({
        name: config.get('default:client:name'),
        clientId: config.get('default:client:clientId'),
        clientSecret: config.get('default:client:clientSecret')
    });

    client.save(function (err, client) {

        if (!err) {
            log.info('New client - %s:%s', client.clientId, client.clientSecret);
        } else {
            return log.error(err);
        }

    });
});

AccessToken.deleteMany({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

RefreshToken.deleteMany({}, function (err) {
    if (err) {
        return log.error(err);
    }
});

setTimeout(function () {
    db.disconnect();
}, 3000);
