import React from "react";
import PropTypes from 'prop-types';


function Clock({className,
                hours,
                minutes,
                seconds,
                miliseconds,
                htmltag }) {

    //hours = (hours < 0 ? 0 : (hours > 23 ? 23 : hours));
    hours = (hours < 0 ? 0 : hours);
    minutes = (minutes < 0 ? 0 : (minutes > 59 ? 59 : minutes));
    seconds = (seconds < 0 ? 0 : (seconds > 59 ? 59 : seconds));
    miliseconds = (miliseconds < 0 ? 0 : (miliseconds > 999 ? 999 : miliseconds));

    const Htmltag = htmltag;
    return (
        <Htmltag key='{key}:{HtmlTag}' className={["Clock ", className].filter(a => a).join(" ")}>
            {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}
            {seconds === null ? "" : ":" + String(seconds).padStart(2, "0")}
            {miliseconds === null ? "" : String(".") + String(miliseconds).padStart(3, "0")}
        </Htmltag>)
}
Clock.defaultProps = {
    //className, 
    hours: 0,
    minutes: 0,
    seconds: 0,
    miliseconds: null,
    htmltag: "h2"
}
Clock.propTypes = {
    className: PropTypes.string,
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number,
    miliseconds: PropTypes.number,
    htmltag: PropTypes.string
}

export default Clock;