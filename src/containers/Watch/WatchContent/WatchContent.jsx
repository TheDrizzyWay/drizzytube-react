import React from 'react';
import { connect } from 'react-redux';
import Video from 'components/Video/Video';
import RelatedVideos from 'components/RelatedVideos/RelatedVideos';
import VideoMetaData from 'components/VideoMetaData/VideoMetaData';
import VideoInfoBox from 'components/VideoInfoBox/VideoInfoBox';
import Comments from '../../Comments/Comments';
import InfiniteScroll from 'components/InfiniteScroll/InfiniteScroll';
import './WatchContent.scss';
import { getVideoById, getRelatedVideos, getAmountComments } from 'store/reducers/video';
import { getChannel } from 'store/reducers/channel';
import { getCommentsForVideo } from 'store/reducers/comment';

const WatchContent = (props) => {
    if (!props.videoId) return <div/>;

    const shouldShowLoader = () => !!props.nextPageToken;
  
    return (
      <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={shouldShowLoader()}>
        <div className='watch-grid'>
          <Video className='video' id={props.videoId} />
          <VideoMetaData className='metadata' video={props.video} />
          <VideoInfoBox className='video-info-box' video={props.video} channel={props.channel} />
          <Comments className='comments' comments={props.comments} amountComments={props.amountComments} />
          <RelatedVideos className='relatedVideos' videos={props.relatedVideos} />
        </div>
      </InfiniteScroll>
    );
}

const mapStateToProps = (state, props) => {
    return {
      relatedVideos: getRelatedVideos(state, props.videoId),
      video: getVideoById(state, props.videoId),
      channel: getChannel(state, props.channelId),
      comments: getCommentsForVideo(state, props.videoId),
      amountComments: getAmountComments(state, props.videoId)
    };
  };

export default connect(mapStateToProps, null)(WatchContent);
