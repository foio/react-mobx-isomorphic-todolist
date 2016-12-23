import React from 'react'
import ReactDOM from 'react-dom';
import TodoApp from './js/view/TodoApp';
import TodoListStore from './js/store/TodoListStore';
require('./css/app.css');

const initialStore = window.__INITIAL_STATE__;
let todoListStore = new TodoListStore();
todoListStore.fromJS(initialStore);

ReactDOM.render(
    <TodoApp store={todoListStore}/>,
    document.getElementById('todoapp')
);