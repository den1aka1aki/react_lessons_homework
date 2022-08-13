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
                    <span><QualitiesList qualities={user.qualities} /></span>
                    <p>Completed Meetings: {user.completedMeetings}</p>
                    <h4>Rate: {user.rate}</h4>
                    <button onClick={backButton}>Все пользователи</button>
                </div>
            </>
        );
    }
    return 'loading...';
};

export default UserCard;
