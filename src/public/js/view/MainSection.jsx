import React from 'react';
import {observer} from 'mobx-react';
import TodoItem from './TodoItem.jsx'

@observer
class MainSection extends React.Component {
    render() {
        let todos = this.props.todos;
        return (
            <section className='main'>
                {this.renderToggleAll()}
                <ul className='todo-list'>
                    {todos.filtedList.map(
                        (todo) => <TodoItem key={todo.id} todo={todo} deleteTodo={todos.deleteTodo}/>
                    )}
                </ul>
            </section>
        );
    }

    toggleCompleted = (e) => {
        this.props.todos.toggleCompleted(e.target.checked)
    }

    componentDidUpdate() {
        console.log('MainSection Update....');
    }

    renderToggleAll = () => {
        let todolist = this.props.todos.todolist;
        let completedCount = this.props.todos.completedCount;
        if (todolist && todolist.length > 0) {
            return (
                <input className='toggle-all'
                       type='checkbox'
                       checked={completedCount === todolist.length}
                       onChange={this.toggleCompleted}
                />
            );
        }
    }
}

export default MainSection;