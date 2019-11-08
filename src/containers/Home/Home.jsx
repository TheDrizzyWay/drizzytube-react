import React from 'react';
import './Home.scss';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';

const Home = () => {
    return (
      <React.Fragment>
        <SideBar/>
        <HomeContent/>
      </React.Fragment>
    );
}

export default Home;
