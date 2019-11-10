import React, { useState } from 'react';
import { Image, Button, Divider } from 'semantic-ui-react';
import Linkify from 'react-linkify';
import { getPublishedAtDateString } from '../../utils/date/date-format';
import './VideoInfoBox.scss';

const VideoInfoBox = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const { video } = props;
    if (!video) return <div/>;

    const getDescriptionParagraphs = () => {
        const videoDescription = video.snippet ? video.snippet.description : null;
        if (!videoDescription) {
          return null;
        }
        return videoDescription.split('\n').map((paragraph, index) => <p key={index}><Linkify>{paragraph}</Linkify></p>);
      };

    const descriptionParagraphs = getDescriptionParagraphs();
    const publishedAtString = getPublishedAtDateString(video.snippet.publishedAt);

    return (
        <div className='video-info-box'>
            <Image className='channel-image' src='http://via.placeholder.com/48x48' circular/>
            <div className="video-info">
                <div className='channel-name'>Channel Name</div>
                <div className='video-publication-date'>{publishedAtString}</div>
            </div>
            <Button color='youtube'>91.5K Subscribe</Button>
            <div className="video-description">
                <div className={collapsed ? 'collapsed' : 'expanded'}>
                    {descriptionParagraphs}
                </div>
                <Button compact onClick={toggleCollapse}>{collapsed ? 'Show Less' : 'Show More'}</Button>
                <Divider />
            </div>
        </div>
    );
}

export default VideoInfoBox;
