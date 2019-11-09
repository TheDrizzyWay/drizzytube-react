import { createSelector } from 'reselect';
import { MOST_POPULAR, VIDEO_CATEGORIES } from '../actions/video';
import { SUCCESS } from '../actions';

const initialState = {
  byId: {},
  mostPopular: {},
  categories: {}
};

const reduceFetchMostPopularVideos = (response, prevState) => {
    const videoMap = response.items.reduce((accumulator, video) => {
      accumulator[video.id] = video;
      return accumulator;
    }, {});
  
    let items = Object.keys(videoMap);
    if (response.hasOwnProperty('prevPageToken') && prevState.mostPopular) {
      items = [...prevState.mostPopular.items, ...items];
    }
  
    const mostPopular = {
      totalResults: response.pageInfo.totalResults,
      nextPageToken: response.nextPageToken,
      items,
    };
  
    return {
      ...prevState,
      mostPopular,
      byId: {...prevState.byId, ...videoMap},
    };
  };

  const reduceFetchVideoCategories = (response, prevState) => {
    const categoryMapping = response.items.reduce((accumulator, category) => {
      accumulator[category.id] = category.snippet.title;
      return accumulator;
    }, {});

    return {
      ...prevState,
      categories: categoryMapping,
    };
  };

const videosReducer = (state = initialState, { type, response }) => {
  switch (type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(response, state);
    case VIDEO_CATEGORIES[SUCCESS]:
      return reduceFetchVideoCategories(response, state);
    default:
      return state;
  }
};

export const getMostPopularVideos = createSelector(
  (state) => state.videos.byId,
  (state) => state.videos.mostPopular,
  (videosById, mostPopular) => {
    if (!mostPopular || !mostPopular.items) {
      return [];
    }
    return mostPopular.items.map(videoId => videosById[videoId]);
  }
);

export const getVideoCategoryIds = createSelector(
  state => state.videos.categories,
  (categories) => {
    return Object.keys(categories || {});
  }
);

export default videosReducer;
