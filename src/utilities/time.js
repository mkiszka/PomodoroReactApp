function convertMiliSecondsToMiliSecondsSecondMinutesHours(timeInMiliSeconds) {

    const miliseconds = Math.floor(timeInMiliSeconds % 1000);
    const seconds = Math.floor(timeInMiliSeconds / 1000 % 60);
    const minutes = Math.floor(timeInMiliSeconds / 1000 / 60 % 60);
    const hours = Math.floor(timeInMiliSeconds / 1000 / 60 / 60);
        
    return [miliseconds, seconds, minutes, hours];
}

function formatTimestampToClockString(timestamp) { 
    let date = new Date();
    date.setTime(timestamp);
    return {
        hours: date.getHours(),
        minutes: parseInt(date.getMinutes().toString().padStart(2, 0)),
        seconds: parseInt(date.getSeconds().toString().padStart(2, 0))
    };
};

export { convertMiliSecondsToMiliSecondsSecondMinutesHours, formatTimestampToClockString };