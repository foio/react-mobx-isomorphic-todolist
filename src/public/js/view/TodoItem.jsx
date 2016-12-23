import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

@observer
class TodoItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            editing: false
        };
    };

    handleDoubleClick = () => {
        this.setState({editing: true});
    }

    handleSave = (title) => {
        this.props.todo.setTitle(title);
        this.setState({editing: false});
    }

    handleToggle = () => {
        this.props.todo.toggle()
    }

    handleDelete = (id) => {
        return () => {
            this.props.deleteTodo(id);
        }
    }

    componentDidUpdate() {
        console.log('TodoItem Update....');
    }

    render() {
        let todo = this.props.todo;
        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput text={todo.title}
                               editing={this.state.editing}
                               onSave={this.handleSave}/>
            );
        } else {
            element = (
                <div className='view'>
                    <input className='toggle'
                           type='checkbox'
                           checked={todo.completed}
                           onChange={this.handleToggle}
                    />
                    <label onDoubleClick={this.handleDoubleClick}>
                        {todo.title}
                    </label>
                    <button onClick={this.handleDelete(todo.id)} className='destroy'/>
                </div>
            );
        }

        return (
            <li className={classnames({
                                completed: todo.completed,
                                editing: this.state.editing
                            })}>
                {element}
            </li>
        );
    }
}

export default TodoItem;
