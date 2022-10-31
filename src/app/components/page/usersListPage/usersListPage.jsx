import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import Pagination from '../../common/pagination';
import { useUser } from '../../../hooks/useUsers';
import { useProfessions } from '../../../hooks/useProfession';
import { useAuth } from '../../../hooks/useAuth';

const UsersListPage = () => {
    const { users } = useUser();
    const { currentUser } = useAuth();
    const { isLoading: professionsLoading, professions } = useProfessions();
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });

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

    const handleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    const handleDelete = (id) => {
        console.log(id);
    };

    function filterUsers (data) {
        const filteredUsers = searchQuery
            ? data.filter(
                (user) =>
                    user.name
                        .toLowerCase()
                        .indexOf(searchQuery.toLowerCase()) !== -1
            )
            : selectedProf
                ? data.filter(
                    (user) =>
                        JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                )
                : data;
        return filteredUsers.filter((u) => u._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
    };
    return (
        <div className='d-flex'>
            {professions && !professionsLoading && (
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
            )}

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

    );
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onBookmark: PropTypes.func,
    onUserLink: PropTypes.func
};

export default UsersListPage;
