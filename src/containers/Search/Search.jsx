import React, { useEffect, useCallback } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoList from '../../components/VideoList/VideoList';
import * as searchActions from '../../store/actions/search';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { getSearchResults, getSearchNextPageToken } from '../../store/reducers/search';
import { getSearchParam } from '../../utils/url';

const Search = (props) => {
    const { youtubeApiLoaded, location, history, searchForVideos } = props;

    const getSearchQuery = useCallback(() => {
        return getSearchParam(location, 'search_query');
        }, [location]);

    useEffect(() => {
        const searchQuery = getSearchQuery();
        if (!searchQuery) return history.push('/');
        if(youtubeApiLoaded) {
            searchForVideos(searchQuery);
        }
    }, [location.key, history, getSearchQuery, youtubeApiLoaded, searchForVideos]);

    const bottomReachedCallback = () => {
        if(props.nextPageToken) {
          searchForVideos(getSearchQuery(), props.nextPageToken, 25);
        }
      };

    return (
        <VideoList
            bottomReachedCallback={bottomReachedCallback}
            showLoader={true}
            videos={props.searchResults}
        />
    );
}

const mapStateToProps = (state, props) => {
    return {
      youtubeApiLoaded: getYoutubeLibraryLoaded(state),
      searchResults: getSearchResults(state, props.location.search),
      nextPageToken: getSearchNextPageToken(state, props.location.search),
    };
  };

const mapDispatchToProps = dispatch => {
    const searchForVideos = searchActions.forVideos.request;
    return bindActionCreators({ searchForVideos }, dispatch);
  };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
