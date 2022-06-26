import React from "react";
import TimeboxListElement from "./TimeboxListElement";
import PropTypes from "prop-types";

class TimeboxList extends React.Component {
    //TODO join TimeboxList + TimeboxListElement

    render() {
        //console.log("render TimeboxList");
        const { timeboxes, onDelete, onEdit, onTitleChange, onTimeChange } = this.props;
        return timeboxes.map((elem, index) => {
            return (
                <TimeboxListElement
                    key={elem.uid}
                    index={index}
                    // title={elem.title}
                    // totalTimeInMinutes={elem.totalTimeInMinutes}
                    timebox={elem}
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

TimeboxList.propTypes = {
   timeboxes: PropTypes.array, 
   onTitleChange: PropTypes.func.isRequired,
   onTimeChange: PropTypes.func.isRequired,
   onEdit: PropTypes.func.isRequired,
   onDelete: PropTypes.func.isRequired
}

export default TimeboxList;