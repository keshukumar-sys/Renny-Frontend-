import React from "react";

const RequiredLabel = ({ text }) => {
  return (
    <label className="text-sm font-medium text-gray-700 mb-1">
      {text} <span className="text-red-500">*</span>
    </label>
  );
};

export default RequiredLabel;