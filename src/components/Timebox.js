import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { IoPlayCircleOutline, IoStopCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { convertMiliSecondsToMiliSecondsSecondMinutesHours } from '../utilities/time'

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitState();
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }
    getInitState() {
        return {
            lastIntervalTime: 0,
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInMiliSeconds: 0,
        };
    }
    handlePlay = (event) => {
        this.setState(() => ({ ...this.getInitState(), isRunning: true }));
        this.startTimer();
    }

    handleTogglePause = (event) => {

        const pauseTime = new Date().getTime();
        this.setState(
            (prevState) => {
                const { isPaused, pausesCount, lastIntervalTime, elapsedTimeInMiliSeconds } = prevState;

                return {
                    isPaused: !isPaused,
                    pausesCount: !isPaused ? pausesCount + 1 : pausesCount,
                    elapsedTimeInMiliSeconds: (
                        !isPaused ?
                            elapsedTimeInMiliSeconds + pauseTime - lastIntervalTime
                            :
                            elapsedTimeInMiliSeconds
                    )
                }

            },
            () => {

                const { isPaused } = this.state;
                if (isPaused) {
                    //console.log("stop");
                    this.stopTimer();
                } else {
                    //console.log("start");
                    this.startTimer(false);

                }
            }
        )
    }

    handleStop = (event) => {
        //console.log("Stio");
        this.setState((prevState) => {
            return ({
                isRunning: false,
                isPaused: false,
                pausesCount: 0,
                elapsedTimeInMiliSeconds: 0
            })


        });
        this.stopTimer();
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }

    startTimer(initializeStartTime = true) {

        this.setState({ lastIntervalTime: new Date().getTime() });

        this.intervalId = window.setInterval(
            () => {
                this.setState(
                    (prevState) => {
                        const now = new Date().getTime();
                        const elapsedTimeInMiliSeconds = prevState.elapsedTimeInMiliSeconds + new Date().getTime() - prevState.lastIntervalTime;
                        const totalTimeInMiliSeconds = prevState.totalTimeInMinutes * 60000;
                        //console.log(totalTimeInMiliSeconds, elapsedTimeInMiliSeconds);
                        if (elapsedTimeInMiliSeconds >= totalTimeInMiliSeconds) {
                            this.stopTimer();
                        }
                        return ({ elapsedTimeInMiliSeconds: elapsedTimeInMiliSeconds, lastIntervalTime: now });

                    }
                );
            },
            100
        )
    }

    render() {

        const { timebox, isEditable } = this.props;

        const { isRunning, isPaused, pausesCount, elapsedTimeInMiliSeconds } = this.state
        let totalTimeInMiliSeconds, timeLeftInMiliSeconds, milisecondsLeft, minutesLeft;
        let secondsLeft, hoursLeft;
        let progressInPercent;
        let timeboxEmpty = false;
        if (timebox === null || Object.keys(timebox).length === 0) {
            totalTimeInMiliSeconds = 0;
            timeLeftInMiliSeconds = 0;
            milisecondsLeft = 0;
            secondsLeft = 0;
            minutesLeft = 0;
            hoursLeft = 0;
            progressInPercent = 0;
            timeboxEmpty = true;
        } else {
            totalTimeInMiliSeconds = timebox.totalTimeInMinutes * 60000;
            timeLeftInMiliSeconds = totalTimeInMiliSeconds - elapsedTimeInMiliSeconds;
            [milisecondsLeft, secondsLeft, minutesLeft, hoursLeft] = convertMiliSecondsToMiliSecondsSecondMinutesHours(timeLeftInMiliSeconds);

            progressInPercent = ((totalTimeInMiliSeconds - elapsedTimeInMiliSeconds) / totalTimeInMiliSeconds) * 100;
        }
        const trulyIsEditable = !timeboxEmpty && isEditable;
        const classNameOfButton = trulyIsEditable ? "button-active" : "button-inactive";

        return (<div data-testid={"Timebox"} className={`Timebox  ${isEditable ? "" : "inactive"}`}>
            <h1>{timebox.title}</h1>
            <h4>Liczba przerw: {pausesCount}</h4>
            <Clock keyPrefix="clock1"
                hours={hoursLeft}
                minutes={minutesLeft}
                seconds={secondsLeft}
                miliseconds={milisecondsLeft}
                className={"TimeboxClock " + (isPaused ? "inactive" : "")} />
            <ProgressBar
                percent={progressInPercent} className={isPaused ? "inactive" : ""} trackRemaining={false} />
            {isPaused || !isRunning ?
                <button aria-label='Play' onClick={this.handlePlay} disabled={!trulyIsEditable}>
                   <IoPlayCircleOutline className={classNameOfButton} />
                </button>
                :
                <button aria-label='Pause' onClick={this.handleTogglePause} disabled={!trulyIsEditable}>
                   <IoPauseCircleOutline className={classNameOfButton} /> 
                </button>
            }
            <button aria-label='Stop' onClick={this.handleStop} disabled={!isRunning || !trulyIsEditable} >
                <IoStopCircleOutline className={classNameOfButton} />
            </button>

        </div >);
    }
}

Timebox.defaultProps = {
    isEditable: true
}

Timebox.propTypes = {
    isEditable: PropTypes.bool,
    timebox: PropTypes.object
}
export default Timebox;