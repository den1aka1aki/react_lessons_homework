import React, { useEffect, useState } from 'react';
import NewComment from './newComment';
import CommentList from './commentList';
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
    return (
        <>
            <div>
                <NewComment onSubmit={handleSubmit}/>
                <CommentList comment = { comments } onClick = {handleRemoveComment}/>
            </div>
        </>
    );
};

export default Comments;
