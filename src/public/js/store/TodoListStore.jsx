import {observable, computed, reaction} from 'mobx';
import TodoItemModel from '../model/TodoItemModel';
import autobind  from 'autobind-decorator'
import {FilterType} from '../util/Enum.jsx'
import {uuid} from '../util/Uuid.jsx'

@autobind
class TotoListStore {
    @observable todolist = [];
    @observable filter = FilterType.SHOW_ALL;
    @observable marked = false;


    toggleCompleted(completed) {
        this.todolist.forEach(todoItem => {
            todoItem.setCompleted(completed)
        });
    }

    changeFilter(filter) {
        this.filter = filter;
    }

    addTodo(title) {
        var self = this;
        var todoItem = new TodoItemModel(uuid(), title, false);
        fetch('/todos', {
            method: 'POST',
            body: JSON.stringify(todoItem.toJS()),
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(function (response) {
            return response.json();
        }).then(function (todoRes) {
            if (todoRes.errCode == 0) {
                self.todolist.push(todoItem);
            }
        }).catch(function (ex) {
            console.log(ex);
        });
    }


    deleteTodo(id) {
        var self = this;
        fetch('/todos/' + id, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(function (response) {
            return response.json();
        }).then(function (todoRes) {
            if (todoRes.errCode == 0) {
                self.todolist = self.todolist.filter((item) => {
                    return item.id != id
                })
            }
        }).catch(function (ex) {
            console.log(ex);
        });
    }

    @computed get filtedList() {
        if (this.filter == FilterType.SHOW_ALL) {
            return this.todolist;
        } else {
            const completed = this.filter == FilterType.SHOW_MARKED ? true : false;
            return this.todolist.filter((item) => {
                return item.completed == completed;
            })
        }
    }

    toJS() {
        return this.todolist.map(todo => todo.toJS());
    }
    
    fromJS(array) {
        this.todolist = array.map(item => TodoItemModel.fromJS(item));
    }

    static initStore(store) {
        fetch('/todos', {
            method: 'GET',
            headers: new Headers({'Content-Type': 'application/json'})
        }).then(function (response) {
            return response.json();
        }).then(function (todolistRes) {
            store.fromJS(todolistRes.data);
        });
    }
}

export default TotoListStore;