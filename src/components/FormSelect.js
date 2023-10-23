import React from "react";

const FormSelect = ({ name, id, value, handleChange, list, labelText }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {list.map((listItem, index) => {
          return (
            <option key={index} value={listItem}>
              {listItem}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
