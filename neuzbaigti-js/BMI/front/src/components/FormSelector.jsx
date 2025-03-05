import React from "react";

const formSelector = () => {
  return (
    <>
      <div className="form-selector flex flex-col w-64 p-4 mt-4 pb-40 rounded-md bg-white float-right">
        <a
          href="/personal-info"
          className="hover:bg-blue-400 hover:text-white pl-4 p-2 mb-2 text-gray-600 rounded-md border-1 border-gray-200"
        >
          personal information
        </a>
        <a
          href="/activity-level"
          className="hover:bg-blue-400 hover:text-white pl-4 p-2 mb-2 text-gray-600 rounded-md border-1 border-gray-200"
        >
          activity level
        </a>
        <a
          href="/goals"
          className="hover:bg-blue-400 hover:text-white pl-4 p-2 text-gray-600 rounded-md border-1 border-gray-200"
        >
          goal
        </a>
      </div>
    </>
  );
};

export default formSelector;
