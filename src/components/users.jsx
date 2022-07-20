import React from 'react';
import User from './user';
import PropTypes from 'prop-types';

const Users = ({ users, onDelete, onBookmark }) => {
    return (
        <>
            {users.map((user) => (
                <User
                    key={user._id}
                    user={user}
                    onDelete={onDelete}
                    onBookmark={onBookmark}
                />
            ))}
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};

export default Users;
