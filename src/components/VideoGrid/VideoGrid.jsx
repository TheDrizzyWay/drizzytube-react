import React from 'react';
import Skeleton from 'react-skeleton-loader';
import './VideoGrid.scss';
import { Divider } from 'semantic-ui-react';
import VideoGridHeader from './VideoGridHeader/VideoGridHeader';
import VideoPreview from '../VideoPreview/VideoPreview';

const VideoGrid = ({ videos, title, hideDivider, loading }) => {
    if (!videos || !videos.length) {
        return <div/>;
      }
    const gridItems = videos.map(video => {
    return (
        loading ? (<Skeleton color='#eff1f6' width='210px' height='118px' />) :
        (<VideoPreview
            video={video}
            key={video.id}
            pathname='/watch'
            search={`?v=${video.id}`}
        />)
        );
    });

    return (
        <>
            <VideoGridHeader title={title} />
                <div className='video-grid'>
                    {gridItems}
                </div>
            {!hideDivider && <Divider />}
        </>
    );
}

export default VideoGrid;
