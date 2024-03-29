import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import AvatarLoader from '../../utils/avatarLoader';
import { useAuth } from '../../hooks/useAuth';

const UserCard = ({ user }) => {
    const history = useHistory();
    const { currentUser } = useAuth();
    const handleEdit = () => {
        history.push(`/users/${user._id}/edit`);
    };
    return (
        <div className='card mb-3'>
            <div className='card-body'>
                {currentUser._id === user._id && <button onClick={handleEdit}
                    className='position-absolute top-0 end-0 btn btn-light btn-sm'>
                    <i className='bi bi-gear'></i>
                </button>}

                <div
                    className='d-flex flex-column align-items-center text-center position-relative'>
                    <AvatarLoader image={user.image} className={'rounded-circle'}/>
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className='text-secondary mb-1'>{user.profession.name}</p>
                        <div className='text-muted'>
                            <i className=' bi bi-caret-down-fill text-primary'
                                role='button'
                            ></i>
                            <i className='bi bi-caret-up text-secondary'
                                role='button'
                            ></i>
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};
export default UserCard;
