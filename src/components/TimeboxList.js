import { memo } from "react";
import React from 'react';

const TimeboxList = memo(React.forwardRef((props, drop) => {
        return (<div ref={drop}>{props.children}</div>);
}
)
);

export default TimeboxList;