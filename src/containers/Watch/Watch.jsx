import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WatchContent from './WatchContent/WatchContent';
import { getYoutubeLibraryLoaded } from 'store/reducers/api';
import { getChannelId } from 'store/reducers/video';
import * as watchActions from 'store/actions/watch';
import * as commentActions from 'store/actions/comment';
import { getSearchParam } from 'utils/url';
import { getCommentNextPageToken } from 'store/reducers/comment';

const Watch = (props) => {
    const { youtubeLibraryLoaded, fetchWatchDetails, history, location, channelId, nextPageToken } = props;

    const getVideoId = useCallback(() => {
      return getSearchParam(location, 'v');
      }, [location]);

    const fetchWatchContent = useCallback(() => {
        const videoId = getVideoId();
        if(!videoId) {
        history.push('/');
        }
        fetchWatchDetails(videoId, channelId);
    }, [fetchWatchDetails, history, getVideoId, channelId]);

    useEffect(() => {
        if (youtubeLibraryLoaded) fetchWatchContent();
    }, [youtubeLibraryLoaded, fetchWatchContent, location.key]);

    const videoId = getVideoId();

    const fetchMoreComments = () => {
      if (nextPageToken) {
        props.fetchCommentThread(videoId, nextPageToken);
      }
    };

    return (
        <WatchContent
          videoId={videoId}
          channelId={channelId}
          bottomReachedCallback={fetchMoreComments}
          nextPageToken={nextPageToken}
        />
    );
}

const mapStateToProps = (state, props) => {
    return {
      youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
      channelId: getChannelId(state, props.location, 'v'),
      nextPageToken: getCommentNextPageToken(state, props.location),
    };
  };

const mapDispatchToProps = dispatch => {
    const fetchWatchDetails = watchActions.details.request;
    const fetchCommentThread = commentActions.thread.request;
    return bindActionCreators({ fetchWatchDetails, fetchCommentThread }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Watch));
