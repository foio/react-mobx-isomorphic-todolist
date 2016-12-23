'use strict';
import fetch from 'node-fetch';
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import TotoListStore from '../../../public/js/store/TodoListStore'
import TodoApp from '../../../public/js/view/TodoApp'

exports.render = function (req, res, next) {
    var todoListUrl = req.protocol + '://' + req.get('host') + req.originalUrl + 'todos';
    fetch(todoListUrl, {
        method: 'GET'
    }).then(function (response) {
        return response.json();
    }).then(function (todolistRes) {
        var store = new TotoListStore();
        store.fromJS(todolistRes.data);
        var contentHtml = ReactDOMServer.renderToString(<TodoApp store={store}/>);
        res.render('index.ejs', {
            contentHtml: contentHtml,
            initialState: JSON.stringify(store.toJS())
        });
    }).catch(function (err) {
        next(err)
    });
}
