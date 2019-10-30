import React from 'react';
import './Watch.scss';
import VideoPreview from '../../components/VideoPreview/VideoPreview';

const Watch = () => {
    return (
        <>
            <VideoPreview horizontal={true} />
            <VideoPreview />
        </>
    )
}

export default Watch;
