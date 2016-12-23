import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';

@observer
class TodoTextInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: props.text || ''
        };
    };

    handleSubmit = (e) => {
        let text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({text: ''});
            }
        }
    }

    handleChange = (e) => {
       this.setState({text: e.target.value});
    }


    handleBlur = (e) => {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        return (
            <input className={classnames({
              edit: this.props.editing,
              'new-todo': this.props.newTodo
             })}
                   type='text'
                   placeholder={this.props.placeholder}
                   autoFocus='true'
                   value={this.state.text}
                   onBlur={this.handleBlur}
                   onChange={this.handleChange}
                   onKeyDown={this.handleSubmit}/>
        );
    }
}

export default TodoTextInput;
