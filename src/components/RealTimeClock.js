import React from "react";
import Clock from "./Clock";
import {formatTimestampToClockString} from "../utilities/time"



class RealTimeClock extends React.Component {

    constructor(props) {
        super(props);
        this.state = { timestamp: Date.now() };

    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ timestamp: Date.now() })
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        const { timestamp } = this.state; 
        const { hours, minutes, seconds } = formatTimestampToClockString(timestamp);
        return (
            <Clock className="RealtimeClock" htmltag="h4" hours={hours} minutes={minutes} seconds={seconds} />
        )
    }
}

export default RealTimeClock;