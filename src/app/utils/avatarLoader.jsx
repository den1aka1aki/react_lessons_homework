import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/display-name
const AvatarLoader = React.memo(({ width, height, className }) => {
    return (
        <img
            src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`}
            className={className}
            alt="avatar"
            width={width}
            height={height}
        />
    );
});

AvatarLoader.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string
};

export default AvatarLoader;
