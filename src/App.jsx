import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'react-redux';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Watch from './containers/Watch/Watch';
import AppLayout from './components/AppLayout/AppLayout';
import { youtubeLibraryLoaded } from './store/reducers/api';

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const App = () => {

  const loadYoutubeApi = (props) => {
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
  }, []);

  return (
      <AppLayout>
        <Switch>
          <Route path="/watch" component={Watch} />
          <Route path="/" component={Home} />
        </Switch>
      </AppLayout>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ youtubeLibraryLoaded }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
