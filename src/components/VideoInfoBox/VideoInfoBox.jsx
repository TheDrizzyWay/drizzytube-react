import React, { useState } from 'react';
import { Image, Button, Divider } from 'semantic-ui-react';
import Linkify from 'react-linkify';
import { getPublishedAtDateString } from 'utils/date/date-format';
import './VideoInfoBox.scss';
import { getShortNumberString } from 'utils/number/number-format';

const VideoInfoBox = ({ video, channel }) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    if (!video || !channel) return <div/>;

    const getDescriptionParagraphs = () => {
        const videoDescription = video.snippet ? video.snippet.description : null;
        if (!videoDescription) {
          return null;
        }
        return videoDescription.split('\n').map((paragraph, index) => <p key={index}><Linkify>{paragraph}</Linkify></p>);
      };

    const getSubscriberButtonText = () => {
        const parsedSubscriberCount = Number(channel.statistics.subscriberCount);
        const subscriberCount = getShortNumberString(parsedSubscriberCount);
        return `Subscribe ${subscriberCount}`;
    };

    const descriptionParagraphs = getDescriptionParagraphs();
    const publishedAtString = getPublishedAtDateString(video.snippet.publishedAt);
    const buttonText = getSubscriberButtonText();
    const channelThumbnail = channel.snippet.thumbnails.medium.url;
    const channelTitle = channel.snippet.title;

    return (
        <div className='video-info-box'>
            <Image className='channel-image' src={channelThumbnail} circular/>
            <div className="video-info">
                <div className='channel-name'>{channelTitle}</div>
                <div className='video-publication-date'>{publishedAtString}</div>
            </div>
            <Button color='youtube'>{buttonText}</Button>
            <div className="video-description">
                <div className={collapsed ? 'collapsed' : 'expanded'}>
                    {descriptionParagraphs}
                </div>
                <Button compact onClick={toggleCollapse}>{collapsed ? 'Show More' : 'Show Less'}</Button>
                <Divider />
            </div>
        </div>
    );
}

export default VideoInfoBox;
