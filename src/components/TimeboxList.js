import React from "react";

class TimeboxList extends React.Component {
    //TODO join TimeboxList + TimeboxListElement

    render() {
        //console.log("render TimeboxList");
        const { children } = this.props;
        return (<>{children}</>);     
    }
}

export default TimeboxList;