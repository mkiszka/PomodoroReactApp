import { memo } from "react";

const TimeboxList = memo( function TimeboxList( ) {
       
        //console.log("render TimeboxList");
        const { children } = this.props;
        return (<>{children}</>);     
    
});

export default TimeboxList;