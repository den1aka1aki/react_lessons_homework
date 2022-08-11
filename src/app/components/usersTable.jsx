import React from 'react';
import PropTypes from 'prop-types';
import Bookmarks from './bookmarks';
import QualitiesList from './qualitiesList';
import Table from './table';
import { Link } from 'react-router-dom';

const UsersTable = ({ users, onSort, selectedSort, onDelete, onBookMark }) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) =>
                <Link to ={'/users/' + user._id}>{user.name}</Link>
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
                        onBookMark(user._id);
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
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}></Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func,
    onBookMark: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
