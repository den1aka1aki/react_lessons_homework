import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light mt-2'>
                <ul className='list-group navbar-nav me-auto mb-2 mb-lg-0'>
                    <li><Link to ='/mainpage' className='list-group-item text-decoration-none border-0'>Main</Link></li>
                    <li><Link to ='/login' className='list-group-item text-decoration-none border-0 mb-3'>Login</Link></li>
                    <li><Link to ='/users' className='list-group-item text-decoration-none border-0'>Users</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default NavBar;
