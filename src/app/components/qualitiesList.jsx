import React from 'react';
import Quality from './quality';
import PropTypes from 'prop-types';

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Quality {...qual} key={qual._id} />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesList;
