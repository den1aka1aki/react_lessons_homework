import React from 'react';
import Quality from './qualities';
import PropTypes from 'prop-types';

const QualitiesCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div
                className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
            >
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <p className="card-text">
                    <span><Quality qualities={qualities}/> </span>
                </p>
            </div>
        </div>
    );
};
QualitiesCard.propTypes = {
    qualities: PropTypes.array
};
export default QualitiesCard;
