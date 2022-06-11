import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import { v4 as uuidv4 } from 'uuid';

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
function ProgressBar({ percent = 0, trackRemaining = false, className }) {

    return (
        <div className={
            `ProgressBar ProgressBar_trackRemaining_${trackRemaining} ${className} `
        }
            style={{ "--width": `${percent}%` }}>

        </div>
    );
}

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

        return (<div className={`Timebox  ${isEditable ? "" : "inactive"}`}>
            <h1>{timebox.title}</h1>

            <Clock keyPrefix="clock1"
                hours={hoursLeft} minutes={minutesLeft}
                seconds={secondsLeft}
                miliseconds={milisecondsLeft}
                className={isPaused ? "inactive" : ""} />
            <ProgressBar
                percent={progressInPercent} className={isPaused ? "inactive" : ""} trackRemaining="false" />
            <button onClick={this.handlePlay} disabled={isRunning || !isEditable}>Start</button>
            <button onClick={this.handleStop} disabled={!isRunning}>Stop</button>
            <button onClick={this.handleTogglePause} disabled={!isRunning}>{isPaused ? "Wznów" : "Pauzuj"}</button>
            Liczba przerw: {pausesCount}
        </div >);
    }
}


class TimeboxCreator extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { onAdd } = this.props;
        const inputs = event.target.getElementsByTagName("input");
        onAdd({ uid: uuidv4(), title: inputs[0].value, totalTimeInMinutes: inputs[1].value });
    }

    render() {
        console.log("render TimeboxCreator");

        const { title, totalTimeInMinutes, isEditable,
            onTitleChange,
            onTotalTimeInMinutesChange
        } = this.props;


        return (<form ref={this.form} onSubmit={this.handleSubmit} className={`TimeboxCreator ${isEditable ? "" : "inactive"}`}>
            <label>Co robisz ?<input disabled={!isEditable} value={title} type="text"
                onChange={onTitleChange} /></label><br />
            <label>Ile minut ?<input disabled={!isEditable} value={totalTimeInMinutes} type="number"
                onChange={onTotalTimeInMinutesChange} /></label><br />
            <button disabled={!isEditable}>Dodaj</button>
        </form>
        );
    }
}


class TimeboxListElement extends React.Component {

    render() {
        console.log("render TimeboxListElement");
        const { index, timebox, onEdit, onDelete, onTitleChange, onTimeChange, onTimeboxUpdate } = this.props;

        return (
            <div className={"Timebox TimeboxListElement"}>
                <div className="TimeboxListElementTitle"><textarea disabled={!timebox.isEditable} value={timebox.title} onChange={(event) => { onTitleChange(event, index) }} /></div>
                <div className="TimeboxListElementTime"><input disabled={!timebox.isEditable} value={timebox.totalTimeInMinutes} onChange={(event) => { onTimeChange(event, index) }} type="number" />min.</div>
                <div className="TimeboxListElementAction">
                    <button onClick={onEdit}>{timebox.isEditable ? "Zapisz" : "Edutuj"}</button>
                    <button onClick={onDelete}>Usuń</button>
                </div>
            </div>
        )
    }
}

class TimeboxList extends React.Component {
    //TODO join TimeboxList + TimeboxListElement

    render() {
        console.log("render TimeboxList");
        const { timeboxes, onDelete, onEdit, onTitleChange, onTimeChange, onTimeboxUpdate } = this.props;
        return timeboxes.map((elem, index) => {

            // console.log(elem.uid);

            return (
                <TimeboxListElement
                    key={elem.uid}
                    index={index}
                    // title={elem.title}
                    // totalTimeInMinutes={elem.totalTimeInMinutes}
                    timebox={elem}
                    onTimeboxUpdate={onTimeboxUpdate}
                    onTitleChange={onTitleChange}
                    onTimeChange={onTimeChange}
                    onEdit={() => { onEdit(elem.uid) }}
                    onDelete={() => { onDelete(elem.uid) }}
                />
            )
        }
        )
    }
}

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Ucze się tego i tamtego?",
            totalTimeInMinutes: 25,
            isEditable: true,             

            timeboxes_currentIndex: 0,

            timeboxes: [
                { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
                { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
                { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
            ]
        }

      
    }

    handleDelete = (uid) => {
        console.log(uid);
        this.setState(
            (prevState) => {
                return { timeboxes: prevState.timeboxes.filter((value, index) => value.uid === uid ? false : true) }
            }
        )
    }

    handleTitleChange = (event) => {
        this.setState({
            title: event.target.value
        });
    }

    handleTotalTimeInMinutesChange = (event) => {

        this.setState({
            totalTimeInMinutes: event.target.value
        });
    }
    handleAdd = (timeboxToAdd) => {
        this.setState((prevState) => {
            let timeboxes = prevState.timeboxes;
            timeboxes = [...prevState.timeboxes, timeboxToAdd];
            return ({ timeboxes: timeboxes });
        }
        )
    }

    handleEditTimeboxListElement = (uid) => {

        this.setState((prevState) => {
            return {
                timeboxes: prevState.timeboxes.map((value) => {
                    return value.uid === uid ? { ...value, isEditable: !value.isEditable } : value
                })
            }
        }
        )
    }

    handleTitleElementChange = (event, id) => {
        const { timeboxes } = this.state;

        timeboxes[id].title = event.target.value;

        this.setState({ timeboxes: timeboxes });

    }

    handleTimeElementChange = (event, id) => {
        const { timeboxes } = this.state;
        timeboxes[id].totalTimeInMinutes = event.target.value;

        this.setState({ timeboxes: timeboxes });
    }
    // handleTimeboxUpdate = (indexToUpdate, updatedTimebox) => {
    //     console.log("test");
    //     this.setState((prevState) => {
    //         const { timeboxes } = prevState;
    //         return timeboxes.map((timebox, index) => {
    //             return indexToUpdate === index ? updatedTimebox : timebox;
    //         }

    //         )

    //     })
    // }




    render() {
        console.log("render Pomodoro");
        const {
            //TODO adjust names

            title,
            totalTimeInMinutes,
            isEditable, //probably to remove

            timeboxes_currentIndex,
            timeboxes

        } = this.state;
        return (
            <>
                <TimeboxCreator title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
                    onAdd={this.handleAdd}
                    isEditable={isEditable} />
                <Timebox
                    timebox={timeboxes[timeboxes_currentIndex]}                        
                    isEditable={true}
                />
                <TimeboxList timeboxes={timeboxes} onDelete={this.handleDelete}
                    onEdit={this.handleEditTimeboxListElement}
                    onTitleChange={this.handleTitleElementChange}
                    onTimeChange={this.handleTimeElementChange}

                />
            </>
        )
    }
}
function App() {
    const totalTimeInSeconds = 3;
    return (<div id="App" className="App">
        <h1>Pomodoro Application</h1>
        <hr />
        <Pomodoro />

    </div>);
}

//const rootElement = document.getElementById("root");
//ReactDOM.render(<App />
//    , rootElement);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
