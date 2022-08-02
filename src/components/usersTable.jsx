import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from './tableHeader';
import TableBody from './tableBody';
import Bookmarks from './bookmarks';
import QualitiesList from './qualitiesList';

const UsersTable = ({ users, onSort, selectedSort, onDelete, onBookmark }) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя'
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <QualitiesList qualities={user.qualities}/>
            )
        },
        professions: {
            path: 'profession.name',
            name: 'Профессия'
        },
        completedMeetings: {
            path: 'completedMeetings',
            name: 'Встретился, раз'
        },
        handleSort: {
            path: 'rate',
            name: 'Оценка'
        },
        bookmark: {
            path: 'bookmark',
            name: 'Избранное',
            component: (user) => (
                <button
                    onClick={() => {
                        onBookmark(user._id);
                    }}>
                    <Bookmarks status={user.bookmark} />
                </button>
            )
        },
        delete: {
            component: (user) => (
                <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => onDelete(user)}>
                    delete
                </button>
            )
        }
    };
    return (
        <table className='table'>
            <TableHeader onSort={onSort} selectedSort={selectedSort} columns={columns}/>
            <TableBody data={users} columns={columns}/>
            {/* <tbody> */}
            {/*     <Users */}
            {/*         users={users} */}
            {/*         onDelete={handleDelete} */}
            {/*         onBookmark={handleBookmark} */}
            {/*     /> */}
            {/* </tbody> */}
        </table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
