import {combineReducers} from 'redux';
import apiReducer from './api';
import videosReducer from './video';
import channelsReducer from './channels';

export default combineReducers({
  api: apiReducer,
  videos: videosReducer,
  channels: channelsReducer
});
