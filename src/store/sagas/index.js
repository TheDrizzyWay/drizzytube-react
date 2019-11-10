import { all, call, put, fork } from 'redux-saga/effects';
import { watchMostPopularVideos, watchVideoCategories, watchMostPopularVideosByCategory } from './video';
import { watchWatchDetails } from './watch';

export function* fetchEntity(request, entity, ...args) {
  try {
    const response = yield call(request);
    yield put(entity.success(response.result, ...args));
  } catch (error) {
    yield put(entity.failure(error, ...args));
  }
}

export const ignoreErrors = (fn, ...args) => {
  return () => {
    const ignoreErrorCallback = (response) => response;
    return fn(...args).then(ignoreErrorCallback, ignoreErrorCallback);
  };
};

export default function *rootSaga() {
  yield all([
    fork(watchMostPopularVideos),
    fork(watchVideoCategories),
    fork(watchMostPopularVideosByCategory),
    fork(watchWatchDetails)
  ]);
}
