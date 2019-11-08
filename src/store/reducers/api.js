import { YOUTUBE_LIBRARY_LOADED } from '../actions/api';

const initialState = {
  libraryLoaded: false
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case YOUTUBE_LIBRARY_LOADED:
      return {
        libraryLoaded: true,
      };
    default:
      return state;
  }
};

export const getYoutubeLibraryLoaded = (state) => state.api.libraryLoaded;
export default apiReducer;
