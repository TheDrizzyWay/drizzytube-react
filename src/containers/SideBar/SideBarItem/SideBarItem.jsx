import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import './SideBarItem.scss';

const SideBarItem = (props) => {
    const { path } = props;
    const shouldBeHighlighted = () => {
        const { pathname } = props.location;

        if (path === '/') {
          return pathname === path;
        }
        return pathname.includes(path);
      };

    const highlight = shouldBeHighlighted() ? 'highlight-item' : null;

    return (
        <Link to={{pathname: path}}>
            <Menu.Item className={['sidebar-item', highlight].join(' ')}>
                <div className='sidebar-item-alignment-container'>
                <span><Icon size='large' name={props.icon} /></span>
                <span>{props.label}</span>
                </div>
            </Menu.Item>
        </Link>
    );
}

export default withRouter(SideBarItem);
