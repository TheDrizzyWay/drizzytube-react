import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppLayout from 'components/AppLayout/AppLayout';
import { youtubeLibraryLoaded } from 'store/actions/api';

const Home = lazy(() => import('containers/Home/Home'));
const Watch = lazy(() => import('containers/Watch/Watch'));
const Trending = lazy(() => import('containers/Trending/Trending'));
const Search = lazy(() => import('containers/Search/Search'));

const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

const App = ({ youtubeLibraryLoaded }) => {

  const loadYoutubeApi = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(apiKey);
        window.gapi.client.load('youtube', 'v3', () => {
          youtubeLibraryLoaded();
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
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route path="/feed/trending" component={Trending} />
            <Route path="/search" component={Search} />
            <Route path="/watch" component={Watch} />
            <Route path="/" component={Home} />
          </Switch>
        </Suspense>
      </AppLayout>
  );
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ youtubeLibraryLoaded }, dispatch);
}

export default connect(null, mapDispatchToProps)(withRouter(App));
