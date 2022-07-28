import React from 'react';
import Qualities from './qualities';
import Bookmarks from './bookmarks';
import PropTypes from 'prop-types';

const User = ({ user, onDelete, onBookmark }) => {
    return (
        <tr key={user._id}>
            <td className='fs-5 '>{user.name}</td>
            <td className=''>
                <Qualities qualities={user.qualities} />
            </td>
            <td className=''>{user.profession.name}</td>
            <td className=''>{user.completedMeetings}</td>
            <td className=''>{user.rate}</td>
            <td>
                <button
                    onClick={() => {
                        onBookmark(user._id);
                    }}>
                    <Bookmarks status={user.bookmark} />
                </button>
            </td>
            <td className=''>
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => onDelete(user)}>
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired
};
export default User;
