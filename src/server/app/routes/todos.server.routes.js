'use strict';

var todos = require('../controllers/todos.server.controller');

module.exports = function (app) {
    app.route('/todos')
        .post(todos.create)
        .get(todos.list)
        .put(todos.udpateAll);

    app.route('/todos/:todosId')
        .get(todos.read)
        .put(todos.update)
        .delete(todos.delete);
};