import React from 'react';
import SideBar from '../SideBar/SideBar';
import VideoGrid from '../../components/VideoGrid/VideoGrid';
import './Home.scss';

const Home = () => {
    return (
        <>
        <SideBar />
        <div className='home'>
          <div className="responsive-video-grid-container">
            <VideoGrid title='Trending'/>
            <VideoGrid title='Autos & Vehicles' hideDivider={true}/>
          </div>
        </div>
        </>
    );
};

export default Home;
