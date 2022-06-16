import React from "react";
import { IoTrashOutline,IoMenu,IoSaveOutline,
    IoAddCircleOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import { v4 as uuidv4 }  from "uuid"

class TimeboxListElement extends React.Component {

    render() {
        console.log("render TimeboxListElement");
        const { index, timebox, onEdit, onDelete, onTitleChange, onTimeChange } = this.props;

        return (
            <div className={"Timebox TimeboxListElement"}>
                <div className="TimeboxListElementTitle"><textarea disabled={!timebox.isEditable} value={timebox.title} onChange={(event) => { onTitleChange(event, index) }} /></div>
                <div className="TimeboxListElementTime"><input disabled={!timebox.isEditable} value={timebox.totalTimeInMinutes} onChange={(event) => { onTimeChange(event, index) }} type="number" />min.</div>
                <div className="TimeboxListElementAction">
                    {timebox.isEditable ? (<IoSaveOutline className="button-active" onClick={onEdit}/>) : (<IoMenu className="button-active" onClick={onEdit}></IoMenu>)}
                                       
                    <IoTrashOutline className="button-active" onClick={onDelete}/>
                </div>
            </div>
        )
    }
}
TimeboxListElement.defaultProps = {
    index: 0,
    timebox: { uid: uuidv4(), title: "Default title", totalTimeInMinutes: 3, isEditable: false },
    onEdit: () => { console.log("handle edit ") },
    onDelete: () => { console.log("handle delete ") },
    onTitleChange: () => { console.log("handle title change ") },
    onTimeChange: () => { console.log("handle time change ") },
    
}

TimeboxListElement.propTypes = {
    index: PropTypes.number.isRequired,
    timebox: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onTitleChange: PropTypes.func.isRequired,
    onTimeChange: PropTypes.func.isRequired
}

export default TimeboxListElement;