import React, { useEffect } from 'react';
import NewComment from '../common/comments/newComment';
import CommentList from '../common/comments/commentList';
import { orderBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from '../../store/comments';
import { useParams } from 'react-router-dom';

const Comments = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadCommentsList(userId));
    }, [userId]);
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments());
    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, pageId: userId }));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ['created_at'], ['desc']);
    return (
        <>
            <NewComment onSubmit={handleSubmit}/>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        {!isLoading
                            ? <CommentList
                                comment={sortedComments}
                                onClick ={handleRemoveComment}
                            />
                            : 'Loading...'}

                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
