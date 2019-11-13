import { SEARCH_FOR_VIDEOS } from 'store/actions/search';
import { SUCCESS, REQUEST } from 'store/actions';

const reduceSearchForVideos = (response, searchQuery, prevState) => {
    let searchResults = response.items.map(item => ({...item, id: item.id.videoId}));
    if (prevState.query === searchQuery) {
      const prevResults = prevState.results || [];
      searchResults = prevResults.concat(searchResults);
    }

    return {
      totalResults: response.pageInfo.totalResults,
      nextPageToken: response.nextPageToken,
      query: searchQuery,
      results: searchResults
    };
};


const searchReducer = (state = {}, { type, response, searchQuery, nextPageToken }) => {
  switch (type) {
    case SEARCH_FOR_VIDEOS[REQUEST]:
      return nextPageToken ? state : {};
    case SEARCH_FOR_VIDEOS[SUCCESS]:
      return reduceSearchForVideos(response, searchQuery, state);
    default:
      return state;
  }
};

export const getSearchResults = (state) => state.search.results;
export const getSearchNextPageToken = (state) => state.search.nextPageToken;

export default searchReducer;
