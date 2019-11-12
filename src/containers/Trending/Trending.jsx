import React, { useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoList from '../../components/VideoList/VideoList';
import { getMostPopularVideos, getMostPopularVideosNextPageToken, allMostPopularVideosLoaded } from '../../store/reducers/video';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import * as videoActions from "../../store/actions/video";

const Trending = (props) => {
    const { youtubeLibraryLoaded, fetchMostPopularVideos } = props;

    useEffect(() => {
        if (youtubeLibraryLoaded) {
            fetchMostPopularVideos(20, true);
        }
    }, [youtubeLibraryLoaded, fetchMostPopularVideos]);

    const shouldShowLoader = () => {
        return !props.allMostPopularVideosLoaded;
    };

    const fetchMoreVideos = () => {
        const { nextPageToken } = props;
        if (youtubeLibraryLoaded && nextPageToken) {
          fetchMostPopularVideos(12, true, nextPageToken);
        }
    };

    const loaderActive = shouldShowLoader();

    return (<VideoList
      bottomReachedCallback={fetchMoreVideos}
      showLoader={loaderActive}
      videos={props.videos}
      />);
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
