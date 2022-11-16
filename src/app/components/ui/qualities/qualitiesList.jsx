import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesByIds, getQualitiesLoadingStatus, loadQualitiesList } from '../../../store/qualities';

const Quality = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (isLoading) return 'Loading...';
    const qualitiesList = useSelector(getQualitiesByIds(qualities));
    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);
    return (
        <>
            {qualitiesList.map((qual) => {
                return (
                    <div key={qual._id} className={'badge m-1 bg-' + qual.color}>
                        {qual.name}
                    </div>
                );
            })}
        </>
    );
};

Quality.propTypes = {
    qualities: PropTypes.array
};

export default Quality;
