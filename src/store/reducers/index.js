import {combineReducers} from 'redux';
import apiReducer from './api';
import videosReducer from './video';
import channelsReducer from './channel';
import commentsReducer from './comment';

export default combineReducers({
  api: apiReducer,
  videos: videosReducer,
  channels: channelsReducer,
  comments: commentsReducer
});
