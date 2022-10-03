import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import api from '../../../api';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import Pagination from '../../common/pagination';

const UsersListPage = () => {
    const [users, setUsers] = useState();
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        if (searchQuery !== '') setSearchQuery('');
        setSelectedProf(item);
    };
    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined);
        setSearchQuery(target.value);
    };

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
        const filteredUsers = searchQuery
            ? users.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
            )
            : selectedProf
                ? users.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : users;
        const count = filteredUsers.length;
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
                        <SearchStatus length={count} />
                        <input onChange={handleSearchQuery} type='text' name='searchQuery' value={searchQuery} placeholder='Search...'/>
                        {count > 0 && (
                            <UsersTable
                                users={userCrop}
                                onDelete={handleDelete}
                                onBookMark={handleBookMark}
                                onSort={handleSort}
                                selectedSort={sortBy}
                            />
                        )}
                        <div className='d-flex justify-content-center'>
                            {filteredUsers.length >= pageSize && (<Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                            )}
                        </div>
                    </div>
                </div>
            )
        );
    }
    return 'loading...';
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func,
    onUserLink: PropTypes.func
};

export default UsersListPage;
