import { all, call, put, fork } from 'redux-saga/effects';
import { watchMostPopularVideos } from './video';

export function* fetchEntity(request, entity, ...args) {
  try {
    const response = yield call(request);
    yield put(entity.success(response.result, ...args));
  } catch (error) {
    yield put(entity.failure(error, ...args));
  }
}

export default function *rootSaga() {
  yield all([
    fork(watchMostPopularVideos)
  ]);
}
