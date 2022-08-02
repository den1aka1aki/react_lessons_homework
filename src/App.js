import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import SearchStatus from './components/searchStatus';
import Pagination from './components/pagination';
import { paginate } from './app/utils/paginate';
import api from './api';
import GroupList from './components/groupList';
import UsersTable from './components/usersTable';
import _ from 'lodash';

const App = () => {
    const [users, setUsers] = useState([]);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ iter: 'name', order: 'asc' });
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession.name === selectedProf.name)
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const handleSort = (item) => {
        setSortBy(item);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    useEffect(() => {
        if (currentPage !== 1) {
            if (count <= 8) {
                setCurrentPage(2);
            }
            if (count <= 4) {
                setCurrentPage(1);
            }
        }
    }, [count]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
        setSelectedProf();
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

    const handleDelete = (id) => {
        setUsers((prevState) => prevState.filter((users) => users !== id));
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
                {users && (
                    <div className='d-flex flex-column'>
                        <SearchStatus length={count} />
                        <UsersTable users={userCrop} onDelete={handleDelete} onBookmark={handleBookmark} onSort={handleSort} selectedSort={sortBy} />
                        <div className='d-flex justify-content-center'>
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default App;
