import React from "react";
import { instanceOf } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Timebox from "./Timebox";
import TimeboxList from "./TimeboxList";
import TimeboxListElement from "./TimeboxListElement";
import TimeboxCreator from "./TimeboxCreator";
import { withCookies, Cookies } from 'react-cookie';

class Pomodoro extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    constructor(props) {
        super(props);
        const { cookies } = this.props;
        const timeboxes =
            cookies.get('timeboxes') ||
            [
                { uid: uuidv4(), title: "Wywołanie eventów", totalTimeInMinutes: 3, isEditable: false },
                { uid: uuidv4(), title: "KP-3034 Migracja z ver 1.14 do 1.15 usuwa powiązanie pacjent pracownik.", totalTimeInMinutes: 20, isEditable: false },
                { uid: uuidv4(), title: "KP-3104 Deploy webserwisu zamówień dla 1.15", totalTimeInMinutes: 20, isEditable: false },
            ];

        this.state = {
            title: "Ucze się tego i tamtego?",
            totalTimeInMinutes: 25,
            isEditable: true,

            timeboxes_currentIndex: 0,

            timeboxes: timeboxes
        }


    }

    handleDelete = (uid) => {
        const { cookies } = this.props;
        this.setState(
            (prevState) => {
                let timeboxes = prevState.timeboxes.filter((value, index) => value.uid === uid ? false : true);
                cookies.set('timeboxes', timeboxes, { path: '/' });
                return { timeboxes: timeboxes }
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
        const { cookies } = this.props;

        this.setState((prevState) => {
            let timeboxes = prevState.timeboxes;
            timeboxes = [...prevState.timeboxes, timeboxToAdd];
            cookies.set('timeboxes', timeboxes, { path: '/' });
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

    handleStartTimeboxListElement = (id) => {
        this.setState({ timeboxes_currentIndex: id });
    }
   
    render() {
        // console.log("render Pomodoro");
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
                    timebox={timeboxes.length > 0 ? timeboxes[timeboxes_currentIndex] : {}}
                    isEditable={true}
                />
                <TimeboxList>
                    {timeboxes.map((elem, index) => {
                        return (
                            <TimeboxListElement
                                key={elem.uid}
                                index={index}                           
                                timebox={elem}
                                onTitleChange={this.handleTitleElementChange}
                                onTimeChange={this.handleTimeElementChange}
                                onEdit={() => { this.handleEditTimeboxListElement(elem.uid) }}
                                onDelete={() => { this.handleDelete(elem.uid) }}
                                onStart={() => { this.handleStartTimeboxListElement(index) }}
                            />
                        );
                    })
                    }
                </TimeboxList>
            </>
        
        )
    }
}
export default withCookies(Pomodoro);