import React from 'react';
import './Watch.scss';
import Video from '../../components/Video/Video';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos';
import VideoMetaData from '../../components/VideoMetaData/VideoMetaData';
import VideoInfoBox from '../../components/VideoInfoBox/VideoInfoBox';

const Watch = () => {
    return (
        <div className='watch-grid'>
            <Video className='video' id='-7fuHEEmEjs' />
            <VideoMetaData className='metadata' viewCount={1000}/>
            <VideoInfoBox className='video-info-box'/>
            <div className='comments' style={{width: '100%', height: '100px', background: '#9013FE'}}>comments</div>
            <RelatedVideos className='relatedVideos'/>
      </div>
    );
}

export default Watch;
