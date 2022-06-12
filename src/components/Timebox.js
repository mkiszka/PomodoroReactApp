import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { IoPlayCircleOutline,IoStopCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastIntervalTime: 0,
            isRunning: false,
            isPaused: false,
            pausesCount: 0,
            elapsedTimeInMiliSeconds: 0,
        }
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }
    handlePlay = (event) => {
        this.setState(
            {
                isRunning: true,
                isPaused: false,
                elapsedTimeInMiliSeconds: 0
            }
        );
        this.startTimer();
    }

    handleTogglePause = (event) => {
        this.setState(
            (prevState) => {

                const { isRunning, isPaused } = prevState;
                return {

                    isPaused: !isPaused,
                    pausesCount: !isPaused ? prevState.pausesCount + 1 : prevState.pausesCount
                }

            },
            () => {
                const { isPaused } = this.state;
                if (isPaused) {
                    console.log("stop");
                    this.stopTimer();
                } else {
                    console.log("start");
                    this.startTimer(false);

                }
            }
        )
    }

    handleStop = (event) => {
        console.log("Stio");
        this.setState((prevState) => {
            return ({
                isRunning: false,
                isPaused: false,
                pausesCount: 0,
                elapsedTimeInMiliSeconds: 0,
                lastIntervalTime: 0
            })


        });
        this.stopTimer();
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
        this.setState(
            (prevState) => {
                const elapsedTimeInMiliSeconds = prevState.elapsedTimeInMiliSeconds + new Date().getTime() - prevState.lastIntervalTime;

                return ({ elapsedTimeInMiliSeconds: elapsedTimeInMiliSeconds });

            }
        );
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
//TODO too many render issue
        const {
            timebox, isEditable,
            onPlay, onStop, onTogglePause } = this.props;

        const { isRunning, isPaused, pausesCount, elapsedTimeInMiliSeconds } = this.state

        const totalTimeInMiliSeconds = timebox.totalTimeInMinutes * 60000;
        const timeLeftInMiliSeconds = totalTimeInMiliSeconds - elapsedTimeInMiliSeconds;
        const milisecondsLeft = Math.floor(timeLeftInMiliSeconds % 1000);
        const secondsLeft = Math.floor(timeLeftInMiliSeconds / 1000 % 60);
        const minutesLeft = Math.floor(timeLeftInMiliSeconds / 1000 / 60 % 60);
        const hoursLeft = Math.floor(timeLeftInMiliSeconds / 1000 / 60 / 60);
        const progressInPercent = ((totalTimeInMiliSeconds - elapsedTimeInMiliSeconds) / totalTimeInMiliSeconds) * 100;
console.log(isPaused,isRunning);
        return (<div className={`Timebox  ${isEditable ? "" : "inactive"}`}>
            <h1>{timebox.title}</h1>
            <h4>Liczba przerw: {pausesCount}</h4>
            <Clock keyPrefix="clock1"
                hours={hoursLeft} minutes={minutesLeft}
                seconds={secondsLeft}
                miliseconds={milisecondsLeft}
                className={isPaused ? "inactive" : ""} />
            <ProgressBar
                percent={progressInPercent} className={isPaused ? "inactive" : ""} trackRemaining="false" />            
            <button onClick={ !isPaused && !isRunning ? this.handlePlay : this.handleTogglePause}> 
                {isRunning && !isPaused ? <IoPauseCircleOutline className="button-active"/> : <IoPlayCircleOutline className="button-active"/> }
            </button>
            <button onClick={this.handleStop} disabled={!isRunning} >
                <IoStopCircleOutline className="button-active"/>
            </button>
           
        </div >);
    }
}

export default Timebox;