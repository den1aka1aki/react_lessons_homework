import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../common/comments/comment';

const CommentList = ({ comment, onClick }) => {
    return comment.map((comment) => (
        <Comment key={comment._id} {...comment} onClick = {onClick}/>
    ));
};
CommentList.propTypes = {
    comment: PropTypes.array,
    onUpdate: PropTypes.func
};
export default CommentList;
