import React from 'react';
import './Watch.scss';
import Video from '../../components/Video/Video';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos';
import VideoMetaData from '../../components/VideoMetaData/VideoMetaData';
import VideoInfoBox from '../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../Comments/Comments';

const Watch = (props) => {
    const getVideoId = () => {
        const searchParams = new URLSearchParams(props.location.search);
        return searchParams.get('v');
      };

    return (
        <div className='watch-grid'>
            <Video className='video' id='-7fuHEEmEjs' />
            <VideoMetaData className='metadata' viewCount={1000}/>
            <VideoInfoBox className='video-info-box'/>
            <Comments className='comments'/>
            <RelatedVideos className='relatedVideos'/>
      </div>
    );
}

export default Watch;
