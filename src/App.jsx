import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Watch from './containers/Watch/Watch';
import AppLayout from './components/AppLayout/AppLayout';
import Trending from './containers/Trending/Trending';
import { youtubeLibraryLoaded } from './store/actions/api';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const App = (props) => {

  const loadYoutubeApi = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(apiKey);
        window.gapi.client.load('youtube', 'v3', () => {
          props.youtubeLibraryLoaded();
        });
      });
    };

    document.body.appendChild(script);
  }

  useEffect(() => {
    loadYoutubeApi();
  });

  return (
      <AppLayout>
        <Switch>
          <Route path="/feed/trending" component={Trending} />
          <Route path="/watch" component={Watch} />
          <Route path="/" component={Home} />
        </Switch>
      </AppLayout>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ youtubeLibraryLoaded }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(App));
