import PropTypes from 'prop-types';
import React from 'react';
import { useQualities } from '../../../hooks/useQuality';

const Quality = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();

    return getQualities(qualities).map((quality) => {
        if (!isLoading) {
            return (
                <div key={quality._id} className={'badge m-1 bg-' + quality.color}>
                    {quality.name}
                </div>
            );
        } else return 'Loading...';
    });
};

Quality.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Quality;
