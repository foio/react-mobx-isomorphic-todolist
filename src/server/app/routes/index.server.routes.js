'use strict';

var index = require('../controllers/index.server.controller');

module.exports = function (app) {
    app.route('/')
        .get(index.render);
};