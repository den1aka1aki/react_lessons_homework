import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../api';
import QualitiesList from './qualitiesList';

const UserCard = () => {
    const { userid } = useParams();
    const [user, setUser] = useState();
    const history = useHistory();
    useEffect(() => {
        api.users.getById(userid).then((data) => {
            setUser(data);
        });
    }, []);
    const backButton = () => {
        history.replace('/users');
    };
    if (user) {
        return (
            <>
                <div className='m-3 '>
                    <h2>{user.name}</h2>
                    <h3>Провефессия: {user.profession.name}</h3>
                    <p><QualitiesList qualities={user.qualities} /></p>
                    <p>Completed Meetings: {user.completedMeetings}</p>
                    <h2>Rate: {user.rate}</h2>
                    <button onClick={backButton}>Все пользователи</button>
                </div>
            </>
        );
    }
    return 'loading...';
};

export default UserCard;
