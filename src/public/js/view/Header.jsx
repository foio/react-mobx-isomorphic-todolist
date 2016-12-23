import React from 'react';
import {observer} from 'mobx-react';
import TodoTextInput  from './TodoTextInput';

@observer
class Header extends React.Component {
    handleSave = (text) => {
        if (text.length !== 0) {
            this.props.todos.addTodo(text);
        }
    }

    render() {
        return (
            <header className='header'>
                <h1>todos</h1>
                <TodoTextInput newTodo={true}
                               onSave={this.handleSave}
                               placeholder='What needs to be done?'/>
            </header>
        );
    }
}

export default Header;
