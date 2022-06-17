function convertMiliSecondsToMiliSecondsSecondMinutesHours(timeInMiliSeconds) {

    const miliseconds = Math.floor(timeInMiliSeconds % 1000);
    const seconds = Math.floor(timeInMiliSeconds / 1000 % 60);
    const minutes = Math.floor(timeInMiliSeconds / 1000 / 60 % 60);
    const hours = Math.floor(timeInMiliSeconds / 1000 / 60 / 60);
        
    return [miliseconds, seconds, minutes, hours];
}


export { convertMiliSecondsToMiliSecondsSecondMinutesHours };