import React, { useState } from 'react';
import { Image, Button, Divider } from 'semantic-ui-react';
import './VideoInfoBox.scss';

const VideoInfoBox = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='video-info-box'>
            <Image className='channel-image' src='http://via.placeholder.com/48x48' circular/>
            <div className="video-info">
                <div className='channel-name'>Channel Name</div>
                <div className='video-publication-date'>Thu 24, 2017</div>
            </div>
            <Button color='youtube'>91.5K Subscribe</Button>
            <div className="video-description">
                <div className={collapsed ? 'collapsed' : 'expanded'}>
                    {/*descriptionParagraphs*/}
                </div>
                <Button compact onClick={toggleCollapse}>{collapsed ? 'Show Less' : 'Show More'}</Button>
                <Divider />
            </div>
        </div>
    );
}

export default VideoInfoBox;
