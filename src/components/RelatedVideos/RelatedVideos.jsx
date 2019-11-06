import React from 'react';
import './RelatedVideos.scss';
import VideoPreview from '../VideoPreview/VideoPreview';
import NextUp from '../NextUp/NextUp';

const RelatedVideos = () => {
    return (
        <div className='related-videos'>
            <NextUp />
            <VideoPreview horizontal={true} />
            <VideoPreview horizontal={true} />
            <VideoPreview horizontal={true} />
        </div>
    );
}

export default RelatedVideos;
