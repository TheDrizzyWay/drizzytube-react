import React from 'react';
import { connect } from 'react-redux';
import Video from '../../../components/Video/Video';
import RelatedVideos from '../../../components/RelatedVideos/RelatedVideos';
import VideoMetaData from '../../../components/VideoMetaData/VideoMetaData';
import VideoInfoBox from '../../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../../Comments/Comments';
import './WatchContent.scss';
import { getVideoById } from '../../../store/reducers/video';

const WatchContent = (props) => {
    if (!props.videoId) return <div/>;
  
    return (
        <div className='watch-grid'>
            <Video className='video' id={props.videoId} />
            <VideoMetaData className='metadata' video={props.video} />
            <VideoInfoBox className='video-info-box' video={props.video} />
            <Comments className='comments'/>
            <RelatedVideos className='relatedVideos'/>
        </div>
    );
}

const mapStateToProps = (state, props) => {
    return {
      video: getVideoById(state, props.videoId)
    };
  };

export default connect(mapStateToProps, null)(WatchContent);
