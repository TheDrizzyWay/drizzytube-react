import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as videoActions from '../../store/actions/video';
import { bindActionCreators } from 'redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';

const Home = (props) => {
  const { fetchMostPopularVideos, fetchVideoCategories, youtubeLibraryLoaded } = props;

  useEffect(() => {
    if (youtubeLibraryLoaded) {
      fetchMostPopularVideos();
      fetchVideoCategories();
    }
  }, [fetchMostPopularVideos, fetchVideoCategories, youtubeLibraryLoaded]);

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
  const fetchVideoCategories = videoActions.categories.request;
  return bindActionCreators({ fetchMostPopularVideos, fetchVideoCategories }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
