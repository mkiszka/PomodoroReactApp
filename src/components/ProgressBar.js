import React from "react";

function ProgressBar({ percent = 0, trackRemaining = false, className }) {

    return (
        <div className={
            `ProgressBar ProgressBar_trackRemaining_${trackRemaining} ${className} `
        }
            style={{ "--width": `${percent}%` }}>

        </div>
    );
}

export default ProgressBar;