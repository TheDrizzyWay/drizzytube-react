import React from 'react';
import './AppLayout.scss';
import HeaderNav from 'containers/HeaderNav/HeaderNav';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const AppLayout = ({ children }) => {
    return (
        <ScrollToTop>
            <div className='app-layout'>
                <HeaderNav/>
                {children}
            </div>
        </ScrollToTop>
    );
}

export default AppLayout;
