import React from "react";
import Clock from "./Clock";



class RealTimeClock extends React.Component {   
    
    constructor(props) {    
        super(props);
        this.state = this.getFormattedCurrentTime();
    }

    getFormattedCurrentTime() { //TODO wyciągnąć na zewnątrz
        const date = new Date();
        return {
            hours: date.getHours(), 
            minutes: parseInt(date.getMinutes().toString().padStart(2,0)), 
            seconds: parseInt(date.getSeconds().toString().padStart(2,0))};
    }

    componentDidMount() {    
        this.timer = setInterval( () => {
            this.setState(this.getFormattedCurrentTime())
        },500)
    }

    componentWillUnmount() {
        clearInterval(this.timer);        
    }

    render () {
        const { hours, minutes, seconds } = this.state; //na timestamp ?
        return (
            <Clock className="RealtimeClock" htmltag="h4" hours={hours} minutes={minutes} seconds={seconds}/>
        )
    }
}

export default RealTimeClock;