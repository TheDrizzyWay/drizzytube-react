import { fork, take } from 'redux-saga/effects';
import { REQUEST } from 'store/actions';
import * as commentActions from 'store/actions/comment';
import * as api from 'store/api/youtube-api';
import { fetchEntity } from './index';

export function* fetchCommentThread(videoId, nextPageToken) {
  const request = api.buildCommentThreadRequest.bind(null, videoId, nextPageToken);
  yield fetchEntity(request, commentActions.thread, videoId);
}

export function* watchCommentThread() {
  while(true) {
    const {videoId, nextPageToken} = yield take(commentActions.COMMENT_THREAD[REQUEST]);
    yield fork(fetchCommentThread, videoId, nextPageToken);
  }
}
