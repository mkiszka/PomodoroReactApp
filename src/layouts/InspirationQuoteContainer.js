import React from "react";


export default function InspirationQuoteContainer({
  children
}) {

  const childrenArray = React.Children.toArray(children);
  
  return (
    <>
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">        
          <div className="flex flex-wrap justify-center">  
            {
              childrenArray.map(elem => {
                return <div className="w-full lg:w-4/12 xl:w-3/12 px-4">
                    <elem.type />
                  </div>                
              })
            }   
            </div>;       
        </div>
      </div>
    </>
  );
}