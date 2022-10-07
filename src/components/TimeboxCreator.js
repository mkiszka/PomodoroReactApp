import React from "react";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";
import PropTypes from "prop-types";
import { CardContainer } from "layouts/cards/CardContainer";
import { CardContainerElement } from "layouts/cards/CardContainerElement";
import TimeboxCreatorLayout from "layouts/TimeboxCreatorLayouot";
import { CardContent } from "layouts/cards/CardContent";

class TimeboxCreator extends React.Component {

    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.state = {
            hasError: false,
            title: '',
            totalTimeInMinutes: 25
        }
    }

    handleSubmit = (event) => {
        try {
            event.preventDefault();
            const { onAdd } = this.props;
            const inputs = event.target.getElementsByTagName("input");
            onAdd({ uid: uuidv4(), title: inputs[0].value, totalTimeInMinutes: inputs[1].value, complete: false });
        } catch (error) {
            this.setState({ hasError: true, error })
        }
    }

    handleTitleCreatorChange = (event) => {
        this.setState({ ...this.state, title: event.target.value });
    }
    handleTotalTimeInMinutesCreatorChange = (event) => {
        this.setState({ ...this.state, totalTimeInMinutes: event.target.value });
    }

    render() {
//        const { isEditable } = this.props;
        const { /*hasError,*/ error, title, totalTimeInMinutes } = this.state;

        return (
            this.state.hasError ?
                <Message summmaryMessage={error.Message} /> :
                <CardContainer>
                    <CardContainerElement>
                        <CardContent>
                            <TimeboxCreatorLayout title={title} totalTimeInMinutes={totalTimeInMinutes} formRef={this.form} titleOnChange={this.handleTitleCreatorChange} totalTimeInMinutesOnChange={this.handleTotalTimeInMinutesCreatorChange} />
                            {/* <form ref={this.form} onSubmit={this.handleSubmit} >a
                        <div>
                            <label>Co robisz ?<input disabled={!isEditable} value={title} type="text"
                                onChange={this.handleTitleCreatorChange} /></label>
                            <label>Ile minut ?<input disabled={!isEditable} value={totalTimeInMinutes} type="number"
                                onChange={this.handleTotalTimeInMinutesCreatorChange} /></label>
                        </div>
                        <div>
                            <button type="submit">
                                  <IoAddCircleOutline disabled={!isEditable} className={`${isEditable ? "button-active" : "button-inactive"}`} />  
                            </button>
                        </div>
                    </form> */}
                        </CardContent>
                    </CardContainerElement>
                </CardContainer>
            //</IconContext.Provider>
        );
    }
}
TimeboxCreator.propTypes = {
    isEditable: PropTypes.bool,
    onAdd: PropTypes.func.isRequired
}
TimeboxCreator.defaultProps = {
    isEditable: true
}
export default TimeboxCreator;