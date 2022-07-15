import { memo } from "react";
import React from 'react';
import { DraggableItemTypes } from "./DraggableItemTypes";
import { useDrop } from "react-dnd";

const TimeboxList = memo((props) => {

        const [, drop] = useDrop(() => ({ accept: DraggableItemTypes.TimeboxListElement })) 
        return (<div ref={drop}>{props.children}</div>);
}
);

export default TimeboxList;