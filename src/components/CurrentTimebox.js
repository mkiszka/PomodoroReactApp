import React from 'react';
import Clock from './Clock';
import ProgressBar from './ProgressBar';
import { IoPlayCircleOutline, IoStopCircleOutline, IoPauseCircleOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { convertMiliSecondsToMiliSecondsSecondMinutesHours } from '../utilities/time'
import { getElapsedTimeInMiliSeconds, getPausesCount, isPaused, isRunning } from '../redux/timeboxReducer';
import { timeboxInitializeTimerState, timeboxPause, timeboxPlay, timeboxStop, timeboxUpdateTimer } from '../redux/timeboxActions';
import { connect, ReactReduxContext } from 'react-redux';
import { CardContainer } from 'layouts/CardContainer';
import { CardElement } from 'layouts/CardElement';
import CardSimple from 'layouts/cards/CardSimple';
import { CardContent } from 'layouts/cards/CardContent';
//TODO 4 refaktor - na kilka komponentów jako reprezentacja stanu
class InternalCurrentTimebox extends React.Component {
    constructor(props) {
        super(props);
        //this.state = this.getInitState();
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);

    }

    componentWillUnmount() {
        window.clearInterval(this.intervalId);
    }

    handlePlay = (event) => {
        this.props.timeboxPlay();
        //this.setState(() => ({ ...this.getInitState(), isRunning: true }));
        this.startTimer();
    }

    handleTogglePause = (event) => {

        const pauseTime = new Date().getTime();
        this.props.timeboxPause(pauseTime);
        this.stopTimer();
    }

    handleStop = (event) => {
        this.props.timeboxStop();
        this.stopTimer();
    }

    stopTimer() {
        window.clearInterval(this.intervalId);
    }

    startTimer(initializeStartTime = true) {
        if (initializeStartTime) {
            this.props.timeboxInitializeTimerState();
        }
        this.intervalId = window.setInterval(
            () => {
                this.props.timeboxUpdateTimer();
                const { totalTimeInMiliSeconds, elapsedTimeInMiliSeconds } = this.props; //ki4 czy poprawne użycie dla reduxa, działa ale czy na pewno?
                if (elapsedTimeInMiliSeconds >= totalTimeInMiliSeconds) {
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
        const state = this.context.store.getState();
        const { timebox, isEditable, progressBarAriaLabel,
            totalTimeInMiliSeconds, elapsedTimeInMiliSeconds,
            pausesCount
        } = this.props;



        let timeLeftInMiliSeconds, milisecondsLeft, minutesLeft;
        let secondsLeft, hoursLeft;
        let progressInPercent;
        let timeboxEmpty = this.isTimeboxEmpty(timebox);
        let timeboxTitle;

        if (timeboxEmpty) {

            timeLeftInMiliSeconds = 0;
            milisecondsLeft = 0;
            secondsLeft = 0;
            minutesLeft = 0;
            hoursLeft = 0;
            progressInPercent = 0;
            timeboxTitle = "";

        } else {
            timeLeftInMiliSeconds = totalTimeInMiliSeconds - elapsedTimeInMiliSeconds;
            [milisecondsLeft, secondsLeft, minutesLeft, hoursLeft] = convertMiliSecondsToMiliSecondsSecondMinutesHours(timeLeftInMiliSeconds);

            progressInPercent = ((totalTimeInMiliSeconds - elapsedTimeInMiliSeconds) / totalTimeInMiliSeconds) * 100;
            timeboxTitle = timebox.title;
        }
        const trulyIsEditable = !timeboxEmpty && isEditable;
        const classNameOfButton = trulyIsEditable ? "button-active" : "button-inactive";
        //TODO - refaktor <div data-testid={"Timebox"}  to tailwind
        return (
        <div data-testid={"Timebox"} className={`Timebox  ${isEditable ? "" : "inactive"}`}>
            <CardContainer>
                <CardElement>
                    <CardContent>
                        <h1>{timeboxTitle}</h1>
                        <h4>Liczba przerw: {pausesCount}</h4>
                        <Clock keyPrefix="clock1"
                            hours={hoursLeft}
                            minutes={minutesLeft}
                            seconds={secondsLeft}
                            miliseconds={milisecondsLeft}
                            className={"TimeboxClock " + (isPaused(state) ? "inactive" : "")} />
                        <ProgressBar
                            percent={progressInPercent} className={isPaused(state) ? "inactive" : ""} trackRemaining={false} ariaLabel={progressBarAriaLabel} />
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
                    </CardContent>
                </CardElement>
            </CardContainer>
        </div >);
    }
}
InternalCurrentTimebox.contextType = ReactReduxContext;
InternalCurrentTimebox.defaultProps = {
    isEditable: true
}

InternalCurrentTimebox.propTypes = {
    isEditable: PropTypes.bool,
    timebox: PropTypes.object
}
const mapStateToProps = (state, ownProps) => {

    return {
        totalTimeInMiliSeconds: ownProps.timebox ? ownProps.timebox.totalTimeInMinutes * 60000 : 0,
        elapsedTimeInMiliSeconds: getElapsedTimeInMiliSeconds(state),
        pausesCount: getPausesCount(state),
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        timeboxUpdateTimer: () => { dispatch(timeboxUpdateTimer()) },
        timeboxPlay: () => { dispatch(timeboxPlay()) },
        timeboxPause: (pauseTime) => { dispatch(timeboxPause(pauseTime)) },
        timeboxStop: () => { dispatch(timeboxStop()) },
        timeboxInitializeTimerState: () => { dispatch(timeboxInitializeTimerState()) }
    }
}
const CurrentTimebx = connect(mapStateToProps, mapDispatchToProps)(InternalCurrentTimebox);
export default CurrentTimebx;