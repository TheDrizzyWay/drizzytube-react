import {combineReducers} from 'redux';
import apiReducer from './api';
import videosReducer from './video';

export default combineReducers({
  api: apiReducer,
  videos: videosReducer
});
