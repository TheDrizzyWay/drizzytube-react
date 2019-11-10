import React from 'react';
import { Icon, Progress } from 'semantic-ui-react';
import './Rating.scss';
import { getShortNumberString } from '../../utils/number/number-format';

const Rating = (props) => {
    let rating = null;
    // Rating component is also used in Comment component hence the need to check for only likeCount
    let likeCount = props.likeCount !== 0 ? props.likeCount : null;
    let dislikeCount = null;

  if(props.likeCount && props.dislikeCount) {
    const amountLikes = parseFloat(props.likeCount);
    const amountDislikes = parseFloat(props.dislikeCount);
    const percentagePositiveRatings = 100.0 * (amountLikes / (amountLikes + amountDislikes));

    likeCount = getShortNumberString(amountLikes);
    dislikeCount = getShortNumberString(amountDislikes);
    rating = <Progress percent={percentagePositiveRatings} size='tiny' />;
  }

    return (
        <div className='rating'>
            <div className='thumbs-up'>
                <Icon name='thumbs outline up'/>
                <span>{likeCount}</span>
            </div>
            <div className='thumbs-down'>
                <Icon name='thumbs outline down'/>
                <span>{dislikeCount}</span>
            </div>
            {rating}
        </div>
    );
}

export default Rating;
