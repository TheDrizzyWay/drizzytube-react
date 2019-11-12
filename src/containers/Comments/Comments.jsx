import React from 'react';
import CommentsHeader from './CommentsHeader/CommentsHeader';
import AddComment from './AddComment/AddComment';
import Comment from './Comment/Comment';

const Comments = (props) => {
    const { comments } = props;
    if (!comments) return <div/>;

    const allComments = props.comments.map((comment) => {
    return <Comment comment={comment} key={comment.id} />;
    });

    return (
        <div>
            <CommentsHeader amountComments={props.amountComments}/>
            <AddComment key="add-comment" />
            {allComments}
        </div>
    );
}

export default Comments;
