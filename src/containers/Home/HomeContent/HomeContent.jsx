import React from 'react';
import { getMostPopularVideos } from '../../../store/reducers/video';
import { connect } from 'react-redux';
import VideoGrid from '../../../components/VideoGrid/VideoGrid';
import './HomeContent.scss';

const AMOUNT_TRENDING_VIDEOS = 12;

const HomeContent = (props) => {
    const trendingVideos = props.mostPopularVideos.slice(0, AMOUNT_TRENDING_VIDEOS);

    return (
        <div className='home-content'>
            <div className="responsive-video-grid-container">
                <VideoGrid title='Trending' videos={trendingVideos}/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return { mostPopularVideos: getMostPopularVideos(state) };
  };

export default connect(mapStateToProps, null)(HomeContent);
