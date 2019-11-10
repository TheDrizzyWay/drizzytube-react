import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = (props) => {
    useEffect(() => {
        if(window) {
            window.scrollTo(0, 0);
        } 
    }, [props.location]);

    return (
        <>
            {props.children}
        </>
    );
}

export default withRouter(ScrollToTop);
