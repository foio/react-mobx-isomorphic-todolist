import {observable, reaction, action} from 'mobx';
import autobind from 'autobind-decorator'

@autobind
class TodoItemModel {
    id;
    @observable title;
    @observable completed;

    constructor(id, title, completed) {
        this.id = id;
        this.title = title;
        this.completed = completed;
        reaction(
            () => this.toJS(),
            todo => fetch('/todos/' + todo.id, {
                method: 'PUT',
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(todo)
            })
        )
    }

    @action
    toggle() {
        this.completed = !this.completed;
    }

    @action
    setCompleted(completed) {
        this.completed = completed;
    }

    @action
    setTitle(title) {
        this.title = title;
    }

    toJS() {
        return {
            id: this.id,
            text: this.title,
            marked: this.completed
        }
    }

    static fromJS(object) {
        return new TodoItemModel(object.id, object.text, object.marked)
    }
}

export default TodoItemModel;