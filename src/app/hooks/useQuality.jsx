import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import QualitiesService from '../services/qualities.service';
import PropTypes from 'prop-types';

const QualitiesContex = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContex);
};
export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    function errorCatcher (error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
    }, [error]);
    useEffect(() => {
        getQualitiesList();
    }, []);
    function getQualities (quality) {
        return qualities.filter((item) => quality.includes(item._id));
    }
    async function getQualitiesList () {
        try {
            const { content } = await QualitiesService.get();
            setQualities(content);
            setLoading(false);
        } catch (e) {
            errorCatcher(e);
        }
    }
    return (
        <QualitiesContex.Provider value={{ isLoading, qualities, getQualities }}>
            { children }
        </QualitiesContex.Provider>
    );
};
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualitiesProvider;
