import React from "react";

interface AppFormError {
  message: String;
  className?: String;
}

const FormErrorLine: React.FC<AppFormError> = ({ message, className = "" }) => {
  return (
    <span
      className={`text-red-500 font-medium text-xs md:text-sm ${className}`}
    >
      {message}
    </span>
  );
};

export default FormErrorLine;
