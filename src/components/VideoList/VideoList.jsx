import React from 'react';
import SideBar from '../../containers/SideBar/SideBar';
import InfiniteScroll from '../InfiniteScroll/InfiniteScroll';
import VideoPreview from '../VideoPreview/VideoPreview';

const VideoList = (props) => {
    const { videos } = props;

    const getVideoPreviews = () => {
        if(!videos || !videos.length) return null;

        const firstVideo = videos[0];
        if (!firstVideo.snippet.description) return null;
    
        return videos.map(video => (
          <VideoPreview horizontal={true} expanded={true}
            video={video} key={video.id} pathname={'/watch'} search={'?v=' + video.id}/>)
        );
      };

    const videoPreviews = getVideoPreviews();

    return (
        <>
            <SideBar/>
            <div className='video-list'>
                <InfiniteScroll bottomReachedCallback={props.bottomReachedCallback} showLoader={props.showLoader}>
                    {videoPreviews}
                </InfiniteScroll>
            </div>
        </>
    );
}

export default VideoList;
