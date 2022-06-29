import React from "react";
import TimeboxListElement from "./TimeboxListElement";
import PropTypes from "prop-types";

class TimeboxList extends React.Component {
    //TODO join TimeboxList + TimeboxListElement

    render() {
        //console.log("render TimeboxList");
        const { children } = this.props;
        return (<>{children}</>);     
    }
}

export default TimeboxList;