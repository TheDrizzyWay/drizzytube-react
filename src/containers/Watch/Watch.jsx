import React, { useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './Watch.scss';
import Video from '../../components/Video/Video';
import RelatedVideos from '../../components/RelatedVideos/RelatedVideos';
import VideoMetaData from '../../components/VideoMetaData/VideoMetaData';
import VideoInfoBox from '../../components/VideoInfoBox/VideoInfoBox';
import Comments from '../Comments/Comments';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import * as watchActions from '../../store/actions/watch';

const Watch = (props) => {
    const { youtubeLibraryLoaded, fetchWatchDetails, history, location, channelId } = props;

    const getVideoId = useCallback(() => {
        const searchParams = new URLSearchParams(location.search);
        return searchParams.get('v');
        }, [location.search]);

    const fetchWatchContent = useCallback(() => {
        const videoId = getVideoId();
        if(!videoId) {
        history.push('/');
        }
        fetchWatchDetails(videoId, channelId);
    }, [fetchWatchDetails, history, getVideoId, channelId]);

    useEffect(() => {
        if (youtubeLibraryLoaded) fetchWatchContent();
    }, [youtubeLibraryLoaded, fetchWatchContent]);

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

const mapStateToProps = state => {
    return {
      youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    };
  };

const mapDispatchToProps = dispatch => {
    const fetchWatchDetails = watchActions.details.request;
    return bindActionCreators({ fetchWatchDetails }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Watch));
