import React from "react";
import "./styles.css";
const SelectCustom = React.forwardRef(
  ({ id, label, required, children, name, onChange, onBlur }, ref) => {
    return (
      <div className="containerInput">
        <label htmlFor={id}>{required ? label + " * " : label}</label>
        <select
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          id={id}
        >
          {children}
        </select>
      </div>
    );
  }
);

export default SelectCustom;
