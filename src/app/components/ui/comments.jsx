import React, { useEffect, useState } from 'react';
import NewComment from '../common/comments/newComment';
import CommentList from '../common/comments/commentList';
import { orderBy } from 'lodash';
import { useParams } from 'react-router-dom';
import api from '../../api';

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
    }, []);
    const handleSubmit = (data) => {
        api.comments.add({ ...data, pageId: userId }).then((data) => setComments([...comments, data]));
    };
    const handleRemoveComment = (id) => {
        api.comments.remove(id).then((id) => {
            setComments((prevState) => prevState.filter((x) => x._id !== id));
        });
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
