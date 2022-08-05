import React from 'react';
import PropTypes from 'prop-types';

const SortIcon = (direction) => {
    if (direction.direction === 'up') {
        return <i className="bi bi-caret-down-fill"></i>;
    } else if (direction.direction === 'down') {
        return <i className="bi bi-caret-up-fill"></i>;
    }
};

SortIcon.propTypes = {
    direction: PropTypes.string.isRequired
};
export default SortIcon;
