import React from 'react';
import './VideoGridHeader.scss';

const VideoGridHeader = ({ title }) => {
    return (
        <div className='video-grid-header'>
            <span className='title'>{title}</span>
        </div>
    );
}

export default VideoGridHeader;
