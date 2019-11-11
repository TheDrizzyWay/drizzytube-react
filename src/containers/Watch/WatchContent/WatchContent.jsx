import React from 'react';
import { connect } from 'react-redux';
import Video from '../../../components/Video/Video';
import RelatedVideos from '../../../components/RelatedVideos/RelatedVideos';
import VideoMetaData from '../../../components/VideoMetaData/VideoMetaData';
import VideoInfoBox from '../../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../../Comments/Comments';
import './WatchContent.scss';
import { getVideoById, getRelatedVideos } from '../../../store/reducers/video';
import { getChannel } from '../../../store/reducers/channel';

const WatchContent = (props) => {
    if (!props.videoId) return <div/>;
  
    return (
        <div className='watch-grid'>
            <Video className='video' id={props.videoId} />
            <VideoMetaData className='metadata' video={props.video} />
            <VideoInfoBox className='video-info-box' video={props.video} channel={props.channel} />
            <Comments className='comments'/>
            <RelatedVideos className='relatedVideos' videos={props.relatedVideos} />
        </div>
    );
}

const mapStateToProps = (state, props) => {
    return {
      relatedVideos: getRelatedVideos(state, props.videoId),
      video: getVideoById(state, props.videoId),
      channel: getChannel(state, props.channelId)
    };
  };

export default connect(mapStateToProps, null)(WatchContent);
