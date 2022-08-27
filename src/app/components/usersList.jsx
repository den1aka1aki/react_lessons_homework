import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import api from '../api';
import { paginate } from '../utils/paginate';
import GroupList from './groupList';
import SearchStatus from './searchStatus';
import UsersTable from './usersTable';
import Pagination from './pagination';
import TextField from './textField';

const UsersList = () => {
    const [users, setUsers] = useState();
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [search, setSearch] = useState('');
    const [searchedUsers, setSearchedUsers] = useState('');
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, []);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch('');
        setSearchedUsers('');
    };
    const handleSearch = (e) => {
        setSearch(e);
        setSearchedUsers(users.filter((user) => user.name.toLowerCase().includes(e.toLowerCase())));
    };
    console.log(searchedUsers.length);
    const handleBookMark = (userBookMark) => {
        setUsers((prevState) =>
            prevState.map((user) => {
                if (user._id === userBookMark) {
                    if (user.bookmark) {
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
        const filteredPageNumber = () => {
            return searchedUsers ? searchedUsers.length : count;
        };
        const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
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
                        <SearchStatus length={filteredPageNumber()} />
                        <TextField onChange={(e) => handleSearch(e.target.value)} value={search} placeholder='Search...'/>
                        {count > 0 && (
                            <UsersTable
                                users={searchedUsers || userCrop}
                                onDelete={handleDelete}
                                onBookMark={handleBookMark}
                                onSort={handleSort}
                                selectedSort={sortBy}
                            />
                        )}
                        <div className='d-flex justify-content-center'>
                            <Pagination
                                itemsCount={filteredPageNumber()}
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

UsersList.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func,
    onUserLink: PropTypes.func
};

export default UsersList;
