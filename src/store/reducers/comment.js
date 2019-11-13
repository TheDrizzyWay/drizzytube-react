import { createSelector } from 'reselect';
import { SUCCESS } from 'store/actions';
import { WATCH_DETAILS } from 'store/actions/watch';
import { COMMENT_THREAD_LIST_RESPONSE } from 'store/api/youtube-response-types';
import { COMMENT_THREAD } from 'store/actions/comment';
import { getSearchParam } from 'utils/url';

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
    case COMMENT_THREAD[SUCCESS]:
      return reduceCommentThread(response, videoId, state);
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(response, videoId, state);
    default:
      return state;
  }
};


const getCommentIdsForVideo = (state, videoId) => {
  const comment = state.comments.byVideo[videoId];
  if (comment) {
    return comment.ids;
  }
  return [];
};

export const getCommentsForVideo = createSelector(
  getCommentIdsForVideo,
  state => state.comments.byId,
  (commentIds, allComments) => {
    return commentIds.map(commentId => allComments[commentId]);
  }
);

const getComment = (state, location) => {
    const videoId = getSearchParam(location, 'v');
    return state.comments.byVideo[videoId];
  };

  export const getCommentNextPageToken = createSelector(
    getComment,
    (comment) => {
      return comment ? comment.nextPageToken : null;
    }
  );  

export default commentsReducer;
