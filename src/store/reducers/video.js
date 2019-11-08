import { MOST_POPULAR } from '../actions/video';
import { SUCCESS } from '../actions';

const initialState = {
  byId: {},
  mostPopular: {},
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

const videosReducer = (state = initialState, { type, response }) => {
  switch (type) {
    case MOST_POPULAR[SUCCESS]:
      return reduceFetchMostPopularVideos(response, state);
    default:
      return state;
  }
};

export default videosReducer;
