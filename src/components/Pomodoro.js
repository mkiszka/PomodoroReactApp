import React from "react";
import { v4 as uuidv4 } from 'uuid';
import Timebox from "./Timebox";
import TimeboxList from "./TimeboxList";
import TimeboxCreator from "./TimeboxCreator";

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
export default Pomodoro;