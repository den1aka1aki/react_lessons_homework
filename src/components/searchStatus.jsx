import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
    if (length <= 4 && length > 1) {
        return (
            <span className="badge m-2 bg-primary p-2 w-25">
                {length} человека тусанет с тобой сегодня
            </span>
        );
    } else if (length === 1) {
        return (
            <span className="badge m-2 bg-primary p-2 w-25">
                {length} человек тусанет с тобой сегодня
            </span>
        );
    } else if (length === 0) {
        return (
            <span className="badge m-2 bg-danger p-2 w-25">
                {' '}
        никто не тусанет с тобой сегодня
            </span>
        );
    }
    return (
        <span className="badge m-2 bg-primary p-2 w-25">
            {length} человек тусанет с тобой сегодня
        </span>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
