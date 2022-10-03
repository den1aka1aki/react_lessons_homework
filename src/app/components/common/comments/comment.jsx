import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import AvatarLoader from '../../../utils/avatarLoader';
import { displayDate } from '../../../utils/displayDate';

const Comment = ({ _id, userId, pageId, content, created_at: created, onClick }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        }, []);
    });
    return (
        <div className='bg-light card-body mb-3'>
            <div className='row'>
                {user
                    ? (
                        <div className='col'>
                            <div className='d-flex flex-start'>
                                <AvatarLoader width={'65px'} height={'65px'} className={'rounded-circle shadow-1-strong me-3'}/>
                                <div
                                    className=' flex-grow-1 flex-shrink-1
                                                '>
                                    <div className='mb-4'>
                                        <div
                                            className=' d-flex justify-content-between align-items-center '>
                                            <p className='mb-1'>
                                                {user.name}
                                                <span className='small'> - {displayDate(created)}
                                                </span>
                                            </p>
                                            <button
                                                className=' btn btn-sm text-primary d-flex align-items-center '
                                                onClick={() => onClick(_id)}
                                            >
                                                <i className=' bi bi-x-lg '></i>
                                            </button>
                                        </div>
                                        <p className='small mb-0'>{content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    : (
                        'loading...'
                    )}
            </div>
        </div>
    );
};
Comment.propTypes = {
    onClick: PropTypes.func,
    _id: PropTypes.string,
    userId: PropTypes.string,
    pageId: PropTypes.string,
    content: PropTypes.string,
    created_at: PropTypes.string
};
export default Comment;
