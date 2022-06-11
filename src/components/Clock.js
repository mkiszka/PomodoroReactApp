import React from "react";

function Clock({ className, hours = 0, minutes = 0, seconds = 0, miliseconds = 0, keyPreffix }) {
    //hours = (hours < 0 ? 0 : (hours > 23 ? 23 : hours));
    hours = (hours < 0 ? 0 : hours);
    minutes = (minutes < 0 ? 0 : (minutes > 59 ? 59 : minutes));
    seconds = (seconds < 0 ? 0 : (seconds > 59 ? 59 : seconds));
    miliseconds = (miliseconds < 0 ? 0 : (miliseconds > 999 ? 999 : miliseconds));
    return (
        <h2 key='{key}:h2' className={"Clock " + className}>
            Pozostało {String(hours).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}.
            {String(miliseconds).padStart(3, "0")}
        </h2>)
}

export default Clock;