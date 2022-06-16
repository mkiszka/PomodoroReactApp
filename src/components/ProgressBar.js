import React from "react";
import PropTypes from "prop-types";

function ProgressBar({ percent, trackRemaining, className }) {

    return (
        <div className={
            `ProgressBar ProgressBar_trackRemaining_${trackRemaining} ${className} `
        }
            style={{ "--width": `${percent}%` }}>

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
}

ProgressBar.propTypes = {
    percent: validateNumberRange(0, 100),
    trackRemaining: PropTypes.bool,
    className: PropTypes.string

}

export default ProgressBar;