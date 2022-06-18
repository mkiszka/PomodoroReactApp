import React from 'react';
import PropTypes from 'prop-types';

function ProgressBar({ color, percent, trackRemaining, className }) {

    return (
        <div className={
            `ProgressBar ProgressBar_trackRemaining_${trackRemaining} ${className} `
        }
            style={{ '--width': `${percent}%`, '--background-color': color }}>

        </div>
    );
}

//min, max, 
function validateNumberRange(min, max) {
    return (prop, propName, componentName) => {
        const val = prop[propName];
        if (!(val >= min && val <= max)) {
            return new Error(`${propName} in ${componentName} is not within [${min},${max}]`);
        }
    }

}

ProgressBar.defaultProps = {
    percent: 0,
    trackRemaining: false,
    color: 'red',
    className: ""
}

ProgressBar.propTypes = {
    percent: validateNumberRange(0, 100),
    trackRemaining: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.oneOf(['red', 'green', 'blue'])

}

export default ProgressBar;