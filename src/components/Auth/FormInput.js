import React from "react";

const FormInput = ({
  type,
  name,
  label,
  value,
  handleChange
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label htmlFor={name} className="mb-1">{label}</label>
      <input 
        autoComplete="off" 
        className="w-full p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none focus-within::bg-transparent" 
        type={type}
        name={name} 
        id={name} 
        value={value} 
        onChange={handleChange} 
        required 
      />
    </div>
  );
}

export default FormInput;