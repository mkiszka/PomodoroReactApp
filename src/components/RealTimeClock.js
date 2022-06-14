import React from "react";
import Clock from "./Clock";

class RealTimeClock extends React.Component {   
    
    constructor(props) {    
        super(props);
        this.state = this.fetchTimerState();
    }

    fetchTimerState() {
        const date = new Date();
        return {
            hours: date.getHours(), 
            minutes: new String(date.getMinutes()).padStart(2,0), 
            seconds: new String(date.getSeconds()).padStart(2,0)};
    }

    componentDidMount() {    
        this.timer = setInterval( () => {
            this.setState(this.fetchTimerState())
        },500)
    }

    componentWillUnmount() {
        clearInterval(this.timer);        
    }

    render () {
        const { hours, minutes, seconds } = this.state; 
        return (
            <Clock className="RealtimeClock" htmltag="h4" hours={hours} minutes={minutes} seconds={seconds}/>
        )
    }
}

export default RealTimeClock;