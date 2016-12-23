import  React from 'react';
import {observer} from 'mobx-react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import MainSection from './MainSection.jsx'
import DevTools from 'mobx-react-devtools';


@observer
class TodoApp extends React.Component {
    render() {
        var todoListStore = this.props.store;
        return (
            <div>
                <DevTools />
                <Header todos={todoListStore}/>
                <MainSection todos={todoListStore}/>
                <Footer todos={todoListStore}/>
            </div>
        );
    }
}

export default TodoApp;