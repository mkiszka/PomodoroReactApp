import React from "react";

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

export default TimeboxListElement;