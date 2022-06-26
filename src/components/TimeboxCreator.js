import React from "react";
import { v4 as uuidv4 } from "uuid";
import { IconContext } from "react-icons/";
import { IoAddCircleOutline } from "react-icons/io5";
import Message from "./Message";
import PropTypes from "prop-types";

class TimeboxCreator extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = { hasError: false }
    }

    handleSubmit = (event) => {
        try {
            event.preventDefault();
            const { onAdd } = this.props;
            const inputs = event.target.getElementsByTagName("input");
            onAdd({ uid: uuidv4(), title: inputs[0].value, totalTimeInMinutes: inputs[1].value });
        } catch (error) {            
            this.setState( { hasError: true, error  })
        }
    }

    render() {
        //console.log("render TimeboxCreator");

        const { title, totalTimeInMinutes, isEditable,
            onTitleChange,
            onTotalTimeInMinutesChange
        } = this.props;
        const { hasError, error } = this.state;

        return (
            this.state.hasError?
            <Message summmaryMessage={error.Message} />:
            <IconContext.Provider value={{ className: "" }}>
                <form ref={this.form} onSubmit={this.handleSubmit} className={`TimeboxCreator ${isEditable ? "" : "inactive"}`}>
                    <div>
                        <label>Co robisz ?<input disabled={!isEditable} value={title} type="text"
                            onChange={onTitleChange} /></label>
                        <label>Ile minut ?<input disabled={!isEditable} value={totalTimeInMinutes} type="number"
                            onChange={onTotalTimeInMinutesChange} /></label>
                    </div>
                    <div>
                        <button type="submit">
                            <IoAddCircleOutline disabled={!isEditable} className={`${isEditable ? "button-active" : "button-inactive"}`} />
                        </button>
                    </div>
                </form>
            </IconContext.Provider>
        );
    }
}
TimeboxCreator.propTypes = {
    title: PropTypes.string,
    totalTimeInMinutes: PropTypes.number,
    isEditable: PropTypes.bool,
    onTitleChange: PropTypes.func.isRequired,
    onTotalTimeInMinutesChange: PropTypes.func.isRequired
}

export default TimeboxCreator;