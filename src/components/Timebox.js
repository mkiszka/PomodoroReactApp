import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { IoPlayCircleOutline, IoStopCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { convertMiliSecondsToMiliSecondsSecondMinutesHours } from '../utilities/time'
import { configureStore } from '@reduxjs/toolkit';
//ki4 mocno do obgadania wygląd poniższej struktury reduxowej
const TIMEBOXACTION = {
    PLAY: 'timebox/play',
    STOP: 'timebox/stop',
    PAUSE: 'timebox/pause',
    SET_LAST_INTERVAL_TIME: 'timebox/setLastIntervalTime',
    UPDATE_TIMER_STATE: 'timebox/updateTimerState',
    INITIALIZE_TIMER_STATE: 'timebox/initializeTimerState'
}
const initialState = {
    lastIntervalTime: 0,
    isRunning: false,
    isPaused: false,
    pausesCount: 0,
    pauseTime: null,
    elapsedTimeInMiliSeconds: 0,
}
//selectors
const getLastIntervalTime = (state) => state.lastIntervalTime;
const isRunning = (state) => state.isRunning;
const isPaused = (state) => state.isPaused;
const getPausesCount = (state) => state.pausesCount;
const getElapsedTimeInMiliSeconds = (state) => state.elapsedTimeInMiliSeconds;
const getTotalTimeInMiliSeconds = (state) => state.totalTimeInMiliSeconds;

//reducer
const timeboxReducer =  (state = initialState, action) => { // (state= initialState, {type, payload} inaczej const timeboxReducer =  (state = initialState, action)
  switch (action.type) {

    case TIMEBOXACTION.PLAY: {
        if( state.isPaused ) {
            return { ...state, isPaused: false, elapsedTimeInMiliSeconds: state.elapsedTimeInMiliSeconds + state.pauseTime - state.lastIntervalTime  }
        } else {
            return { ...initialState, isRunning: true }
        }
    }
    case TIMEBOXACTION.STOP: {
        return { ...initialState }
    }
    case TIMEBOXACTION.PAUSE: {
        return { ...state, isPaused: true, pausesCount: state.pausesCount + 1, pauseTime: action.pauseTime }
    }
    case TIMEBOXACTION.INITIALIZE_TIMER_STATE: {
        return { ...state, lastIntervalTime: new Date().getTime() }
    }
 /*   case TIMEBOXACTION.SET_LAST_INTERVAL_TIME: {
        return { ...state, lastIntervalTime: action.lastIntervalTime }
    }*/      
    case TIMEBOXACTION.UPDATE_TIMER_STATE: {
        const now = new Date().getTime();
        const elapsedTimeInMiliSeconds = state.elapsedTimeInMiliSeconds  + new Date().getTime() - state.lastIntervalTime;
       // const totalTimeInMiliSeconds = state.totalTimeInMinutes * 60000;

        return { ...state, elapsedTimeInMiliSeconds, lastIntervalTime: now }
    }
    default:
        return state
  }
}
//action creators
//todo przy przenoszeniu do timeboxReducer wywalić z nazw 'timebox'
const timeboxPlay = () => ({ type: TIMEBOXACTION.PLAY })
const timeboxStop = () => ({ type: TIMEBOXACTION.STOP })
const timeboxInitializeTimerState = () => ({ type: TIMEBOXACTION.INITIALIZE_TIMER_STATE })
// const timeboxSetLastIntervalTime = () => ({ 
//     type: TIMEBOXACTION.SET_LAST_INTERVAL_TIME, 
//     lastIntervalTime: new Date().getTime() });
const timeboxUpdateTimer = () =>  ({ type: TIMEBOXACTION.UPDATE_TIMER_STATE});
const timeboxPause = (pauseTime) => ({ type: TIMEBOXACTION.PAUSE, pauseTime});

class Timebox extends React.Component {
    constructor(props) {
        super(props);
        
        //this.state = this.getInitState();
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.reRender = this.reRender.bind(this);

        this.store = configureStore({ reducer: timeboxReducer});        
        this.unsubscribe = this.store.subscribe(this.reRender);
    }
    reRender = () => {
        this.forceUpdate();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    // getInitState() {
    //     return {
    //         lastIntervalTime: 0,
    //         isRunning: false,
    //         isPaused: false,
    //         pausesCount: 0,
    //         elapsedTimeInMiliSeconds: 0,
    //     };
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
                if( getElapsedTimeInMiliSeconds(state) >= getTotalTimeInMiliSeconds(state)) {
                    this.stopTimer();
                }                
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