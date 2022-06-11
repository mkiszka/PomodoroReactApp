import React from "react";
import TimeboxListElement from "./TimeboxListElement";

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

export default TimeboxList;