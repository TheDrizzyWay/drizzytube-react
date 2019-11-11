import { WATCH_DETAILS} from '../actions/watch';
import { SUCCESS } from '../actions';
import { CHANNEL_LIST_RESPONSE } from '../api/youtube-api-response-types';

const initialState = {
  byId: {}
};

const reduceWatchDetails = (responses, prevState) => {
    const channelResponse = responses.find(response => response.result.kind === CHANNEL_LIST_RESPONSE);
    let channels = {};
    if (channelResponse && channelResponse.result.items) {
      const channel = channelResponse.result.items[0];
      channels[channel.id] = channel;
    }
    return {
      ...prevState,
      byId: {
        ...prevState.byId,
        ...channels
      }
    };
  };


export default function (state = initialState, { type, response }) {
  switch (type) {
    case WATCH_DETAILS[SUCCESS]:
      return reduceWatchDetails(response, state);
    default:
      return state;
  }
}