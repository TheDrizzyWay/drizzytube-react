import React from 'react';
import './RelatedVideos.scss';
import VideoPreview from '../VideoPreview/VideoPreview';
import NextUp from '../NextUp/NextUp';

const RelatedVideos = ({ videos }) => {
    if (!videos || !videos.length) return <div className='related-videos' />;

    const nextUpVideo = videos[0];
    const remainingVideos = videos.slice(1);

    const relatedVideosPreviews = remainingVideos.map(relatedVideo => (
        <VideoPreview 
            video={relatedVideo}
            key={relatedVideo.id}
            pathname='/watch'
            search={`?v=${relatedVideo.id}`}
            horizontal={true}
        />
    ));

    return (
        <div className='related-videos'>
            <NextUp video={nextUpVideo}/>
            {relatedVideosPreviews}
        </div>
    );
}

export default RelatedVideos;
