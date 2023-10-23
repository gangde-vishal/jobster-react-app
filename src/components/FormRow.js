import React, { useCallback } from "react";

const FormRow = ({ name, type, labelText, value, handleChange }) => {
  // Autofocus on position field
  const positionInput = useCallback((inputElement) => {
    if (inputElement?.name === "position" || inputElement?.name === "name") {
      inputElement.focus();
    }
    if (inputElement?.name === "email") {
      inputElement.focus();
    }
  }, []);

  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="form-input"
        autoComplete="off"
        ref={positionInput}
      />
    </div>
  );
};

export default FormRow;
