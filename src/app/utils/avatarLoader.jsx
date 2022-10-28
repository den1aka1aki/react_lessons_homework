import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const AvatarLoader = React.memo(({ width, height, image, className }) => {
    return (
        <img
            src={image}
            className={className}
            alt="avatar"
            width={width}
            height={height}
        />
    );
});

AvatarLoader.propTypes = {
    width: PropTypes.number,
    image: PropTypes.object,
    height: PropTypes.number,
    className: PropTypes.string
};

export default AvatarLoader;
