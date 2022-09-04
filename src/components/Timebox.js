import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { IoPlayCircleOutline, IoStopCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { convertMiliSecondsToMiliSecondsSecondMinutesHours } from '../utilities/time'
import { configureStore } from '@reduxjs/toolkit';
import { getElapsedTimeInMiliSeconds, getPausesCount, getTotalTimeInMiliSeconds, isPaused, isRunning, timeboxReducer } from '../redux/timeboxReducer';
import { timeboxInitializeTimerState, timeboxPause, timeboxPlay, timeboxStop, timeboxUpdateTimer } from '../redux/timeboxActions';

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        
        //this.state = this.getInitState();
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.reRender = this.reRender.bind(this);

        this.store = configureStore({ reducer: timeboxReducer});        
        this.unsubscribe = this.store.subscribe(this.reRender);
        //this.store.dispatch(timeboxUpdateTimeInMinues(props?.timebox?.totalTimeInMinutes));
    }
    
    reRender = () => {
        //ki4 czuje żę to nie jest dobre wymuszać rerender za każdym razem ?
        this.forceUpdate();
    }
    componentWillUnmount() {
        this.unsubscribe();
        window.clearInterval(this.intervalId);
    }
    // componentDidUpdate(prevProps) {
    //     if( prevProps?.timebox?.totalTimeInMinutes !== getTotalTimeInMiliSeconds(this.state) / 6000 ) {
    //         this.store.dispatch(timeboxUpdateTimeInMinues(prevProps?.timebox?.totalTimeInMinutes));
    //     }
    // }
    
    handlePlay = (event) => {
        this.store.dispatch(timeboxPlay());
        //this.setState(() => ({ ...this.getInitState(), isRunning: true }));
        this.startTimer();
    }

    handleTogglePause = (event) => {

        const pauseTime = new Date().getTime();
        this.store.dispatch(timeboxPause(pauseTime));
        this.stopTimer();      
    }

    handleStop = (event) => {
        //console.log("Stio");
        this.store.dispatch(timeboxStop());
        this.stopTimer();
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }

    startTimer(initializeStartTime = true) {
        if(initializeStartTime) {
            this.store.dispatch(timeboxInitializeTimerState());
        }
        this.intervalId = window.setInterval(
            () => {
                this.store.dispatch(timeboxUpdateTimer());
                const state = this.store.getState();
                // if( getElapsedTimeInMiliSeconds(state) >= getTotalTimeInMiliSeconds(state)) {
                //     this.stopTimer();
                // }                
            },
            100
        )
    }

    isTimeboxEmpty(timebox) {
        if (timebox == null || Object.keys(timebox).length === 0) {  
            return true;
        }
        return false;
    }

    render() {
        const state = this.store.getState();
        const { timebox, isEditable, progressBarAriaLabel } = this.props;
     
        const pausesCount = getPausesCount(state);
        const elapsedTimeInMiliSeconds = getElapsedTimeInMiliSeconds(state);

        let totalTimeInMiliSeconds, timeLeftInMiliSeconds, milisecondsLeft, minutesLeft;
        let secondsLeft, hoursLeft;
        let progressInPercent;
        let timeboxEmpty = this.isTimeboxEmpty(timebox);
        let timeboxTitle;

        if (timeboxEmpty) {
            totalTimeInMiliSeconds = 0;
            timeLeftInMiliSeconds = 0;
            milisecondsLeft = 0;
            secondsLeft = 0;
            minutesLeft = 0;
            hoursLeft = 0;
            progressInPercent = 0;
            timeboxTitle = "";
            
        } else {
            totalTimeInMiliSeconds = timebox.totalTimeInMinutes * 60000;
            timeLeftInMiliSeconds = totalTimeInMiliSeconds - elapsedTimeInMiliSeconds;
            [milisecondsLeft, secondsLeft, minutesLeft, hoursLeft] = convertMiliSecondsToMiliSecondsSecondMinutesHours(timeLeftInMiliSeconds);

            progressInPercent = ((totalTimeInMiliSeconds - elapsedTimeInMiliSeconds) / totalTimeInMiliSeconds) * 100;
            timeboxTitle = timebox.title;
        }
        const trulyIsEditable = !timeboxEmpty && isEditable;
        const classNameOfButton = trulyIsEditable ? "button-active" : "button-inactive";

        return (<div data-testid={"Timebox"} className={`Timebox  ${isEditable ? "" : "inactive"}`}>
            <h1>{timeboxTitle}</h1>
            <h4>Liczba przerw: {pausesCount}</h4>
            <Clock keyPrefix="clock1"
                hours={hoursLeft}
                minutes={minutesLeft}
                seconds={secondsLeft}
                miliseconds={milisecondsLeft}
                className={"TimeboxClock " + (isPaused(state) ? "inactive" : "")} />
            <ProgressBar
                percent={progressInPercent} className={isPaused(state) ? "inactive" : ""} trackRemaining={false} ariaLabel={progressBarAriaLabel}/>
            {isPaused(state) || !isRunning(state) ?
                <button aria-label='Play' onClick={this.handlePlay} disabled={!trulyIsEditable}>
                   <IoPlayCircleOutline className={classNameOfButton} />
                </button>
                :
                <button aria-label='Pause' onClick={this.handleTogglePause} disabled={!trulyIsEditable}>
                   <IoPauseCircleOutline className={classNameOfButton} /> 
                </button>
            }
            <button aria-label='Stop' onClick={this.handleStop} disabled={!isRunning(state) || !trulyIsEditable} >
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