import React from 'react';
import PropTypes from 'prop-types';
import Bookmarks from '../common/bookmarks';
import Qualities from './qualities';
import Table from '../common/table/table';
import { Link } from 'react-router-dom';
import Professions from './professions';

const UsersTable = ({ users, onSort, selectedSort, onBookMark }) => {
    const columns = {
        name: {
            path: 'name',
            name: 'Имя',
            component: (user) =>
                <Link to ={`/users/${user._id}`}>{user.name}</Link>
        },
        qualities: {
            name: 'Качества',
            component: (user) => (
                <Qualities qualities={user.qualities}/>
            )
        },
        professions: {
            name: 'Профессия',
            component: (user) => <Professions id={user.profession}/>
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
        }
    };
    return (
        <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users}></Table>
    );
};

UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    onBookMark: PropTypes.func,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};
export default UsersTable;
