import React from "react";

const CardSkeleten = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-4 mx-auto">
      <div className="skeleton w-full h-64"></div>
      <div className="skeleton w-full h-64"></div>
      <div className="skeleton w-full h-64"></div>
      <div className="skeleton w-full h-64"></div>
    </div>
  );
};

export default CardSkeleten;
