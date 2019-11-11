import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WatchContent from './WatchContent/WatchContent';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { getChannelId } from '../../store/reducers/video';
import * as watchActions from '../../store/actions/watch';
import { getSearchParam } from '../../utils/url';

const Watch = (props) => {
    const { youtubeLibraryLoaded, fetchWatchDetails, history, location, channelId } = props;

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

    return (
        <WatchContent videoId={videoId} channelId={channelId} />
    );
}

const mapStateToProps = (state, props) => {
    return {
      youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
      channelId: getChannelId(state, props.location, 'v')
    };
  };

const mapDispatchToProps = dispatch => {
    const fetchWatchDetails = watchActions.details.request;
    return bindActionCreators({ fetchWatchDetails }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Watch));
