import React, { useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoPreview from '../../components/VideoPreview/VideoPreview';
import SideBar from '../SideBar/SideBar';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
import { getMostPopularVideos, getMostPopularVideosNextPageToken, allMostPopularVideosLoaded } from '../../store/reducers/video';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import * as videoActions from "../../store/actions/video";
import './Trending.scss';

const Trending = (props) => {
    const { youtubeLibraryLoaded, fetchMostPopularVideos } = props;

    useEffect(() => {
        if (youtubeLibraryLoaded) {
            fetchMostPopularVideos(20, true);
        }
    }, [youtubeLibraryLoaded, fetchMostPopularVideos]);

    const getVideoPreviews = () => {
        return props.videos.map(video => (
          <VideoPreview horizontal={true} expanded={true} video={video}
          key={video.id} pathname={'/watch'} search={'?v=' + video.id}/>)
        );
    };

    const shouldShowLoader = () => {
        return !props.allMostPopularVideosLoaded;
    };

    const fetchMoreVideos = () => {
        const { nextPageToken } = props;
        if (youtubeLibraryLoaded && nextPageToken) {
          fetchMostPopularVideos(12, true, nextPageToken);
        }
    };

    const previews = getVideoPreviews();
    const loaderActive = shouldShowLoader();

    return (
        <>
            <SideBar/>
            <div className='trending'>
            <InfiniteScroll bottomReachedCallback={fetchMoreVideos} showLoader={loaderActive}>
                {previews}
            </InfiniteScroll>
            </div>
        </>
    );
}

const mapStateToProps = state => {
    return {
      videos: getMostPopularVideos(state),
      youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
      allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
      nextPageToken: getMostPopularVideosNextPageToken(state),
    };
};
  
const mapDispatchToProps = dispatch => {
    const fetchMostPopularVideos = videoActions.mostPopular.request;
    return bindActionCreators({ fetchMostPopularVideos }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
