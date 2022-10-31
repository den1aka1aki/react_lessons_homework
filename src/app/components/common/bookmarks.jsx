import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PropTypes from 'prop-types';

const Bookmarks = ({ status }) => {
    return (
        <i className={`bi bi-bag-heart${status ? '-fill' : ''}`}></i>
    );
};

Bookmarks.propTypes = {
    status: PropTypes.bool
};

export default Bookmarks;
