import React from 'react';
import NewComment from '../common/comments/newComment';
import CommentList from '../common/comments/commentList';
import { orderBy } from 'lodash';
import { UseComments } from '../../hooks/useComments';

const Comments = () => {
    const { createComment, comments, removeComment } = UseComments();
    const handleSubmit = (data) => {
        // api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
        createComment(data);
    };
    const handleRemoveComment = (id) => {
        removeComment(id);
        // api.comments.remove(id).then((id) => {
        //     setComments((prevState) => prevState.filter((x) => x._id !== id));
        // });
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
                        <CommentList
                            comment={sortedComments}
                            onClick ={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
