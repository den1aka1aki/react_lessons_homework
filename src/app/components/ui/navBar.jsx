import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import NavProfile from './navProfile';
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from '../../store/users';

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <>
            <nav className='navbar bg-light mb-3'>
                <div className='container-fluid'>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link to='/' className="nav-link" aria-current="page" >Main</Link>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link to='/users' ria-current="page" className="nav-link" >Users</Link>
                            </li>
                        )}
                    </ul>
                    <div className='d-flex'>
                        {isLoggedIn
                            ? <NavProfile/>
                            : <Link to='/login' ria-current="page" className="nav-link" >Login</Link>
                        }
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
