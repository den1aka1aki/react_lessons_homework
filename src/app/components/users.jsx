import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import api from '../api';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import Pagination from './pagination';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handleBookmark = (userBookmark) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                if (user._id === userBookmark) {
                    if (user.bookmark === true) {
                        return { ...user, bookmark: false };
                    } else {
                        return { ...user, bookmark: true };
                    }
                }
                return user;
            })
        );
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((users) => users !== id));
    };
    if (users) {
        const filteredUsers = selectedProf
            ? users.filter((user) => user.profession.name === selectedProf.name)
            : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        useEffect(() => {
            api.professions.fetchAll().then((data) => setProfessions(data));
            api.users.fetchAll().then((data) => setUsers(data));
        }, []);
        // useEffect(() => {
        //     if (currentPage !== 1) {
        //         if (count <= 8) {
        //             setCurrentPage(2);
        //         }
        //         if (count <= 4) {
        //             setCurrentPage(1);
        //         }
        //     }
        // }, [count]);
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            professions && (
                <div className='d-flex'>
                    <div className='d-flex flex-column flex-shrink-0 p-3'>
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className='btn btn-secondary mt-2'
                            onClick={clearFilter}>
                        Очистить
                        </button>
                    </div>

                    <div className='d-flex flex-column'>
                        <SearchStatus length={count} />
                        <UsersTable
                            users={userCrop}
                            onDelete={handleDelete}
                            onBookmark={handleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy} />
                        <div className='d-flex justify-content-center'>
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            )
        );
    }
    return 'loading...';
};

Users.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func
};

export default Users;
