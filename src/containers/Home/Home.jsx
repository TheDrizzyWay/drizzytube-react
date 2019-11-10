import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as videoActions from '../../store/actions/video';
import { bindActionCreators } from 'redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { getVideoCategoryIds, videoCategoriesLoaded, videosByCategoryLoaded } from '../../store/reducers/video';
import SideBar from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';

const Home = (props) => {
  const { fetchMostPopularVideos, fetchVideoCategories, youtubeLibraryLoaded, videoCategories, fetchMostPopularVideosByCategory } = props;

  const [categoryIndex, setcategoryIndex] = useState(0);

  const bottomReachedCallback = () => {
    if (!props.videoCategoriesLoaded) return;
    setcategoryIndex(categoryIndex + 3);
  };

  const shouldShowLoader = () => {
    if (props.videoCategoriesLoaded && props.videosByCategoryLoaded) {
      return categoryIndex < videoCategories.length;
    }
    return false;
  };

  useEffect(() => {
    if (youtubeLibraryLoaded) {
      if (!videoCategories.length) {
        fetchMostPopularVideos();
        fetchVideoCategories();
      } else {
        const categoryStartIndex = categoryIndex;
        const categories = videoCategories.slice(categoryStartIndex, categoryStartIndex + 3);
        fetchMostPopularVideosByCategory(categories);
      }
    }
  }, [fetchMostPopularVideos, fetchVideoCategories, youtubeLibraryLoaded, videoCategories, fetchMostPopularVideosByCategory, categoryIndex]);

    return (
      <>
        <SideBar />
        <HomeContent
          bottomReachedCallback={bottomReachedCallback}
          showLoader={shouldShowLoader}
        />
      </>
    );
}

const mapStateToProps = state => {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    videoCategories: getVideoCategoryIds(state),
    videoCategoriesLoaded: videoCategoriesLoaded(state),
    videosByCategoryLoaded: videosByCategoryLoaded(state),
  };
};

const mapDispatchToProps = dispatch => {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  const fetchVideoCategories = videoActions.categories.request;
  const fetchMostPopularVideosByCategory = videoActions.mostPopularByCategory.request;
  return bindActionCreators({ fetchMostPopularVideos, fetchVideoCategories, fetchMostPopularVideosByCategory }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
