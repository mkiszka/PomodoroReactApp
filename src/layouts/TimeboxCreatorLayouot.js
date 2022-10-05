import React from "react";

export default function TimeboxCreatorLayout({title, totalTimeInMinutes, formRef, titleOnChange, totalTimeInMinutesOnChange }) {
  return (
    <>      
             
                <form ref={formRef}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"                     
                    >
                      Co robisz ?
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Wpisz wykonywaną czynność"
                      value={title}
                      onChange={titleOnChange}
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"                      
                    >
                      Ile minut
                    </label>
                    <input
                      type="number"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      value={totalTimeInMinutes}
                      onChange={totalTimeInMinutesOnChange}
                    />
                  </div>                 
                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Dodaj
                    </button>
                  </div>
                </form>            
    </>
  );
}
