import React from 'react';
import Quality from './quality';
import Bookmarks from './bookmarks';
import PropTypes from 'prop-types';

const User = ({ user, onDelete, onBookmark, qualities }) => {
    return (
        <tr>
            <td className='fs-5 '>{user.name}</td>
            <td>
                {qualities.map((qual) => (
                    <Quality {...qual} key={qual._id} />
                ))}
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
    user: PropTypes.object.isRequired,
    qualities: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func
};
export default User;
