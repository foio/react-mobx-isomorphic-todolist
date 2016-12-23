import {observable, reaction} from 'mobx';
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

    toggle() {
        this.completed = !this.completed;
    }

    setCompleted(completed) {
        this.completed = completed;
    }

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