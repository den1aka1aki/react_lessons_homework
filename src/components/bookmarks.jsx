import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';

const Bookmarks = ({ status }) => {
    return (status
        ? <i className='bi bi-bag-heart-fill'></i>
        : <i className='bi bi-bag-heart'></i>
    );
};

Bookmarks.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmarks;
