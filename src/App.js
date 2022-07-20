import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import SearchStatus from './components/searchStatus';
import api from './api';
import Users from './components/users';
import Pagination from './components/pagination';
import { paginate } from './app/utils/paginate';

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

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
        <>
            <SearchStatus length={users.length} />
            {count > 0
                ? (
                    <div>
                        <table className='table'>
                            <thead>
                                <tr className=''>
                                    <th className='' scope='col'>Имя</th>
                                    <th className='' scope='col'>Качества</th>
                                    <th className='' scope='col'>Профессия</th>
                                    <th className='' scope='col'>Встретился, раз</th>
                                    <th className='' scope='col'>Оценка</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <Users
                                    users={userCrop}
                                    onDelete={handleDelete}
                                    onBookmark={handleBookmark}
                                />
                            </tbody>
                        </table>
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )
                : null}
        </>
    );
};

export default App;
