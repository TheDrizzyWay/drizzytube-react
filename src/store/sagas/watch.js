import { fork, take, all, call, put } from 'redux-saga/effects';
import * as watchActions from '../actions/watch';
import { REQUEST } from '../actions';
import { buildVideoDetailRequest, buildRelatedVideosRequest } from '../api/youtube-api';

export function* fetchWatchDetails(videoId) {
    let requests = [
      buildVideoDetailRequest.bind(null, videoId),
      buildRelatedVideosRequest.bind(null, videoId),
    ];
  
    try {
      const responses = yield all(requests.map(fn => call(fn)));
      yield put(watchActions.details.success(responses));
    } catch (error) {
      yield put(watchActions.details.failure(error));
    }
  }

export function* watchWatchDetails() {
  while (true) {
    const { videoId } = yield take(watchActions.WATCH_DETAILS[REQUEST]);
    yield fork(fetchWatchDetails, videoId);
  }
}
