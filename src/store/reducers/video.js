import { createSelector } from 'reselect';
import { MOST_POPULAR, VIDEO_CATEGORIES, MOST_POPULAR_BY_CATEGORY } from '../actions/video';
import { SUCCESS } from '../actions';
import { VIDEO_DETAILS, WATCH_DETAILS } from '../actions/watch';
import { VIDEO_LIST_RESPONSE, SEARCH_LIST_RESPONSE } from '../api/youtube-response-types';
import { getSearchParam } from '../../utils/url';

const initialState = {
  byId: {},
  mostPopular: {},
  categories: {},
  related: {}
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

  const groupVideosByIdAndCategory = (response) => {
    const videos = response.items;
    const byId = {};
    const byCategory = {
      totalResults: response.pageInfo.totalResults,
      nextPageToken: response.nextPageToken,
      items: [],
    };
  
    videos.forEach((video) => {
      byId[video.id] = video;
  
      const items = byCategory.items;
      if(items && items) {
        items.push(video.id);
      } else {
        byCategory.items = [video.id];
      }
    });
  
    return { byId, byCategory };
  };

  const reduceFetchMostPopularVideosByCategory = (responses, categories, prevState) => {
    let videoMap = {};
    let byCategoryMap = {};
  
    responses.forEach((response, index) => {
      if (response.status === 400) return;
  
      const categoryId = categories[index];
      const {byId, byCategory} = groupVideosByIdAndCategory(response.result);
      videoMap = { ...videoMap, ...byId };
      byCategoryMap[categoryId] = byCategory;
    });
  
    return {
      ...prevState,
      byId: { ...prevState.byId, ...videoMap },
      byCategory: { ...prevState.byCategory, ...byCategoryMap },
    };
  };

  const reduceRelatedVideosRequest = (responses) => {
    const relatedVideosResponse = responses.find(r => r.result.kind === SEARCH_LIST_RESPONSE);
    const { pageInfo, items, nextPageToken } = relatedVideosResponse.result;
    const relatedVideoIds = items.map(video => video.id);
  
    return  {
      totalResults: pageInfo.totalResults,
      nextPageToken,
      items: relatedVideoIds
    };
  };

  const reduceWatchDetails = (responses, prevState) => {
    const videoDetailResponse = responses.find(r => r.result.kind === VIDEO_LIST_RESPONSE);
    const video = videoDetailResponse.result.items[0];
    const relatedEntry = reduceRelatedVideosRequest(responses);
  
    return {
      ...prevState,
      byId: {
        ...prevState.byId,
        [video.id]: video
      },
      related: {
        ...prevState.related,
        [video.id]: relatedEntry
      }
    };
  };

  const reduceVideoDetails = (responses, prevState) => {
    const videoResponses = responses.filter(response => response.result.kind === VIDEO_LIST_RESPONSE);
    const parsedVideos = videoResponses.reduce((videoMap, response) => {
      const video = response.result.items ? response.result.items[0] : null;
      if (!video) return videoMap;

      videoMap[video.id] = video;
      return videoMap;
      }, {});
  
    return {
      ...prevState,
      byId: {...prevState.byId, ...parsedVideos},
    };
  };


const videosReducer = (state = initialState, { type, response, categories }) => {
  switch (type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(response, state);
    case VIDEO_CATEGORIES[SUCCESS]:
      return reduceFetchVideoCategories(response, state);
    case MOST_POPULAR_BY_CATEGORY[SUCCESS]:
      return reduceFetchMostPopularVideosByCategory(response, categories, state);
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(response, state);
    case VIDEO_DETAILS[SUCCESS]:
      return reduceVideoDetails(response, state);
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

export const getVideosByCategory = createSelector(
  state => state.videos.byCategory,
  state => state.videos.byId,
  state => state.videos.categories,
  (videosByCategory, videosById, categories) => {
    return Object.keys(videosByCategory || {}).reduce((accumulator, categoryId) => {
      const videoIds = videosByCategory[categoryId].items;
      const categoryTitle = categories[categoryId];
      accumulator[categoryTitle] = videoIds.map(videoId => videosById[videoId]);
      return accumulator;
    }, {});
  }
);

export const videoCategoriesLoaded = createSelector(
  state => state.videos.categories,
  (categories) => {
    return Object.keys(categories || {}).length !== 0;
  }
);

export const videosByCategoryLoaded = createSelector(
  state => state.videos.byCategory,
  (videosByCategory) => {
    return Object.keys(videosByCategory || {}).length;
  }
);

export const getVideoById = (state, videoId) => {
  return state.videos.byId[videoId];
};

const getRelatedVideoIds = (state, videoId) => {
  const related = state.videos.related[videoId];
  return related ? related.items : [];
};

export const getRelatedVideos = createSelector(
  getRelatedVideoIds,
  state => state.videos.byId,
  (relatedVideoIds, videos) => {
    if (relatedVideoIds) {
      return relatedVideoIds.map(({ videoId }) => videos[videoId]).filter(video => video);
    }
    return [];
  });

export const getChannelId = (state, location, name) => {
  const videoId = getSearchParam(location, name);
  const video = state.videos.byId[videoId];
  if (video) {
    return video.snippet.channelId;
  }
  return null;
};

export const getAmountComments = createSelector(
  getVideoById,
  (video) => {
    if (video) {
      return video.statistics.commentCount;
    }
    return 0;
  });

const getMostPopular = (state) => state.videos.mostPopular;

export const getMostPopularVideosNextPageToken = createSelector(
  getMostPopular,
  (mostPopular) => {
    return mostPopular.nextPageToken;
  }
);

export const allMostPopularVideosLoaded = createSelector(
  [getMostPopular],
  (mostPopular) => {
    const amountFetchedItems = mostPopular.items ? mostPopular.items.length : 0;
    return amountFetchedItems === mostPopular.totalResults;
  }
);

export default videosReducer;
