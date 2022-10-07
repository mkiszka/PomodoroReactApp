import React from "react";
import { v4 as uuidv4 } from "uuid"

export function CardContainer({
  children
}) {
  return (
    <>
      <div className="relative bg-lightBlue-600 ">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div className="flex flex-wrap justify-center">            
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

