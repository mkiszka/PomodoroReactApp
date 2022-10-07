import React from "react";

export function CardContent({
  children
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
        <div className="flex-auto px-4 lg:px-10 py-10">
          {children}
        </div>
      </div>
    </>
  );
}
