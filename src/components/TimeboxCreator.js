import React from "react";
import { v4 as uuidv4 } from "uuid";

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

export default TimeboxCreator;