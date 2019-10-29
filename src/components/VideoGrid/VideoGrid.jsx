import React from 'react';
import './VideoGrid.scss';
import { Divider } from 'semantic-ui-react';
import VideoGridHeader from './VideoGridHeader/VideoGridHeader';
import VideoPreview from '../VideoPreview/VideoPreview';

const VideoGrid = (props) => {
    return (
        <>
        <VideoGridHeader title={props.title} />
        <div className='video-grid'>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
            <VideoPreview/>
        </div>
        {!props.hideDivider && <Divider />}
        </>
    );
};

export default VideoGrid;
