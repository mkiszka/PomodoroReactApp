import { memo } from "react";
import React from 'react';

import { useDrop } from "react-dnd";
import { DraggableItemTypes } from "components/DraggableItemTypes";

export const CardContainerDraggable = memo(({ children }) => {
  const [, drop] = useDrop(() => ({ accept: DraggableItemTypes.TimeboxListElement }))
  return (<>
    <div ref={drop} className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="flex flex-wrap justify-center">
          {children}
        </div>
      </div>
    </div>
  </>);
}
);