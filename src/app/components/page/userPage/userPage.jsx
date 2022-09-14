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
        }, []);
    });
    // const handleClick = () => {
    //     history.push('/users');
    // };
    const handleEdit = () => {
        history.push(`/users/${user._id}/edit`);
    };
    if (user) {
        return (
            <>
                <div className='container'>
                    <div className='row gutters-sm'>
                        <div className='col-md-4 mb-3'>
                            <div className='card mb-3'>
                                <div className='card-body'>
                                    <button onClick={handleEdit}
                                        className='
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                '
                                    >
                                        <i className='bi bi-gear'></i>
                                    </button>
                                    <div
                                        className="
                                    d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative
                                "
                                    >
                                        <img
                                            src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">{user.profession.name}</p>
                                            <div className="text-muted">
                                                <i
                                                    className="
                                                bi bi-caret-down-fill
                                                text-primary
                                            "
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="
                                                bi bi-caret-up
                                                text-secondary
                                            "
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">{user.rate}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div
                                    className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                                >
                                    <h5 className="card-title">
                                        <span><Quality qualities={user.qualities}/> </span>
                                    </h5>
                                    <p className="card-text">
                                        <span className="badge bg-primary">Primary</span>
                                        <span className="badge bg-secondary"
                                        >Secondary</span
                                        >
                                        <span className="badge bg-success">Success</span>
                                        <span className="badge bg-danger">Danger</span>
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card mb-3">
                                    <div
                                        className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                    >
                                        <h5 className="card-title">
                                            <span>Completed meetings</span>
                                        </h5>

                                        <h1 className="display-1">{user.completedMeetings}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='m-3 '> */}
                {/*     <h2>{user.name}</h2> */}
                {/*     <h3>Провефессия: {user.profession.name}</h3> */}
                {/*     <span><Quality qualities={user.qualities} /></span> */}
                {/*     <p>Completed Meetings: {user.completedMeetings}</p> */}
                {/*     <h4>Rate: {user.rate}</h4> */}
                {/*     <button className="btn btn-primary m-2" onClick={handleClick}> */}
                {/*         Все пользователи */}
                {/*     </button> */}
                {/*     <button */}
                {/*         className="btn btn-danger" */}
                {/*         onClick={() => { */}
                {/*             handleEdit(); */}
                {/*         }}> */}
                {/*         Изменить пользователя */}
                {/*     </button> */}
                {/* </div> */}
            </>
        );
    }
    return 'loading...';
};

UserPage.propTypes = {
    userId: PropTypes.string
};
export default UserPage;
