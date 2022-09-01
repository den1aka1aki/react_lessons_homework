import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../api';

import PropTypes from 'prop-types';
import Quality from '../../ui/qualities';

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    });
    const handleClick = () => {
        history.push('/users');
    };
    if (user) {
        return (
            <>
                <div className='m-3 '>
                    <h2>{user.name}</h2>
                    <h3>Провефессия: {user.profession.name}</h3>
                    <span><Quality qualities={user.qualities} /></span>
                    <p>Completed Meetings: {user.completedMeetings}</p>
                    <h4>Rate: {user.rate}</h4>
                    <button onClick={handleClick}>Все пользователи</button>
                </div>
            </>
        );
    }
    return 'loading...';
};

UserPage.propTypes = {
    userId: PropTypes.string
};
export default UserPage;
