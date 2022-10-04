import React from "react";
import PropTypes from "prop-types";

export default function CardSimple({
  shortDescription, 
  description,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">            
              <span className="font-semibold text-xl text-blueGray-700">
                {description}
              </span>
            </div>            
          </div>
          <p className="text-sm text-blueGray-400 mt-4">            
            <span className="whitespace-nowrap">{shortDescription}</span>
          </p>
        </div>
      </div>
    </>
  );
}

CardSimple.defaultProps = {
  shortDescription: "Peter Knight", 
  description: "Be or not to be"
};

CardSimple.propTypes = {
  shortDescription: PropTypes.string,
  description: PropTypes.string 
};
