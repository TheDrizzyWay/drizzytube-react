import React from 'react';
import { Button, Divider, Icon } from 'semantic-ui-react';
import Rating from '../Rating/Rating';
import './VideoMetaData.scss';

const VideoMetaData = (props) => {
    const { video } = props;
    if (!video || !video.statistics) return <div/>;

    const viewCount = Number(video.statistics.viewCount).toLocaleString();

    return (
        <div className='video-metadata'>
            <h3>{video.snippet.title}</h3>
            <div className='video-stats'>
                <span>{viewCount} views</span>
                <div className='video-actions' >
                <Rating
                    likeCount={video.statistics.likeCount}
                    dislikeCount={video.statistics.dislikeCount}
                />
                <Button basic icon labelPosition='left'>
                    <Icon name='share'/>
                    Share
                </Button>
                <Button basic icon>
                    <Icon name='add circle' />
                </Button>
                <Button basic icon>
                    <Icon name='ellipsis horizontal' />
                </Button>
                </div>
            </div>
            <Divider/>
        </div>
    );
}

export default VideoMetaData;
