import { SEARCH_FOR_VIDEOS } from '../actions/search';
import { SUCCESS } from '../actions';

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


export default function(state = {}, { type, response, searchQuery }) {
  switch (type) {
    case SEARCH_FOR_VIDEOS[SUCCESS]:
      return reduceSearchForVideos(response, searchQuery);
    default:
      return state;
  }
}

export const getSearchResults = (state) => state.search.results;

export const getSearchNextPageToken = (state) => state.search.nextPageToken;
