import React from "react";

interface AppFormError {
  message?: string | undefined;
  className?: string;
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
