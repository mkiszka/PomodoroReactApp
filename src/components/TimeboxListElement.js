import React from "react";
import { IoTrashOutline,IoMenu,IoSaveOutline,
    IoAddCircleOutline } from "react-icons/io5";


class TimeboxListElement extends React.Component {

    render() {
        console.log("render TimeboxListElement");
        const { index, timebox, onEdit, onDelete, onTitleChange, onTimeChange, onTimeboxUpdate } = this.props;

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

export default TimeboxListElement;