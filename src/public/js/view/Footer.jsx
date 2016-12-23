import React from 'react';
import {observer} from 'mobx-react';
import classnames  from 'classnames';
import {FilterType} from '../util/Enum.jsx'

const FILTER_LIST = [
    FilterType.SHOW_ALL,
    FilterType.SHOW_UNMARKED,
    FilterType.SHOW_MARKED
];

let getFilterText = function (filter) {
    switch (filter) {
        case FilterType.SHOW_ALL:
            return 'all';
        case FilterType.SHOW_UNMARKED:
            return 'pending';
        case FilterType.SHOW_MARKED:
            return 'complete';
        default:
            return 'all';
    }
}

@observer
class Footer extends React.Component {
    render() {
        return (
            <footer className='footer'>
                <ul className='filters'>
                    {
                        FILTER_LIST.map(filterItem => {
                            return (
                                <li key={filterItem}>
                                    {this.renderFilterLink(filterItem)}
                                </li>
                            )
                        })
                    }
                </ul>
            </footer>
        );
    }

    changeFilter = (filter) => {
        let todos = this.props.todos;
        return () => todos.changeFilter(filter);
    }

    renderFilterLink = (filterItem) => {
        let title = getFilterText(filterItem);
        let selectedFilter = this.props.todos.filter;
        return (
            <a className={classnames({ selected: filterItem === selectedFilter })}
               style={{ cursor: 'hand' }}
               onClick={this.changeFilter(filterItem)}>
                {title}
            </a>
        );
    }
}

export default Footer;
