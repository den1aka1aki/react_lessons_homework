import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
    if (length <= 4 && length > 1) {
        return (
            <h2>
                <span className="badge m-2 bg-primary p-2 ">
                    {length} человека тусанет с тобой сегодня
                </span>
            </h2>
        );
    } else if (length === 1) {
        return (
            <h2>
                <span className="badge m-2 bg-primary p-2 ">
                    {length} человек тусанет с тобой сегодня
                </span>
            </h2>
        );
    } else if (length === 0) {
        return (
            <h2>
                <span className="badge m-2 bg-danger p-2 ">
                    {' '}
        никто не тусанет с тобой сегодня
                </span>
            </h2>
        );
    }
    return (

        <h2>
            <span className="badge m-2 bg-primary p-2 ">
                {length} человек тусанет с тобой сегодня
            </span>
        </h2>

    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
