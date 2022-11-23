import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import UserPage from '../components/page/userPage/userPage';
import UsersListPage from '../components/page/usersListPage/usersListPage';
import { useSelector } from 'react-redux';
import UsersLoader from '../components/ui/hoc/usersLoader';
import EditUserPage from '../components/page/editUserPage';
import { getCurrentUserId } from '../store/users';

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId
                    ? (
                        edit
                            ? (
                                userId === currentUserId
                                    ? (
                                        <EditUserPage />
                                    )
                                    : (
                                        <Redirect to={`/users/${currentUserId}/edit`} />
                                    )
                            )
                            : (
                                <UserPage userId={userId} />
                            )
                    )
                    : (
                        <UsersListPage />
                    )}
            </UsersLoader>
        </>
    );
};

export default Users;
