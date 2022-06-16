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
ProgressBar.defaultProps = {
    percent: 0,
    trackRemaining: false,    
}

ProgressBar.propTypes = {
    percent: PropTypes.number,
    trackRemaining: PropTypes.bool,
    className: PropTypes.string

}

export default ProgressBar;