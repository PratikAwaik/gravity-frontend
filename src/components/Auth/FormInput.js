import React from "react";
import PropTypes from "prop-types";

const FormInput = ({
  type,
  name,
  label,
  value,
  handleChange,
  error,
  extraProps,
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor={name} className="mb-1 font-bold">
        {label}
      </label>
      <input
        autoComplete="off"
        className={`w-full p-2 bg-transparent border-2 rounded-md ${
          error ? "border-theme-red" : "border-theme-green"
        } outline-none focus-within::bg-transparent`}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        required
        {...extraProps}
      />
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  extraProps: PropTypes.object,
};

export default FormInput;
