import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as videoActions from '../../store/actions/video';
import { bindActionCreators } from 'redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';

const Home = (props) => {
  const { fetchMostPopularVideos, youtubeLibraryLoaded } = props;

  useEffect(() => {
    if (youtubeLibraryLoaded) {
      fetchMostPopularVideos();
    }
  }, [fetchMostPopularVideos, youtubeLibraryLoaded]);

    return (
      <>
        <SideBar />
        <HomeContent />
      </>
    );
}

const mapStateToProps = state => {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
  };
};

const mapDispatchToProps = dispatch => {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
