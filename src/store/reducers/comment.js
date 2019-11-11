import { SUCCESS } from '../actions';
import { WATCH_DETAILS } from '../actions/watch';
import { COMMENT_THREAD_LIST_RESPONSE } from '../api/youtube-response-types';

const initialState = {
  byVideo: {},
  byId: {},
};

const reduceCommentThread = (response, videoId, prevState) => {
    if (!response) return prevState;

    const newComments = response.items.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    const prevCommentIds = prevState.byVideo[videoId] ? prevState.byVideo[videoId].ids : [];
    const commentIds = [...prevCommentIds, ...Object.keys(newComments)];
  
    const byVideoComment = {
      nextPageToken: response.nextPageToken,
      ids: commentIds,
    };
  
    return {
      ...prevState,
      byId: {
        ...prevState.byId,
        ...newComments,
      },
      byVideo: {
        ...prevState.byVideo,
        [videoId]: byVideoComment,
      }
    };
  };

const reduceWatchDetails = (responses, videoId, prevState) => {
    const commentThreadResponse = responses.find(res => res.result.kind === COMMENT_THREAD_LIST_RESPONSE);
    return reduceCommentThread(commentThreadResponse.result, videoId, prevState);
  };

const commentsReducer = (state = initialState, { type, response, videoId}) => {
  switch (type) {
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(response, videoId, state);
    default:
      return state;
  }
};

export default commentsReducer;