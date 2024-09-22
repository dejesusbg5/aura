import React from "react";

export default function InputField({
  id,
  value,
  type = "text",
  label = `${id}:`,
  values = [],
  options = {},
  groupOptions = {},
  required = false,
  onChange,
}) {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return <textarea id={id} name={id} value={value} {...options} required={required} onChange={onChange} />;

      case "select":
        return (
          <select id={id} name={id} {...options} required={required} onChange={onChange}>
            {values.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input type={type} id={id} name={id} value={value} {...options} required={required} onChange={onChange} />
        );
    }
  };

  return (
    <div className="au-form-group" {...groupOptions}>
      <label htmlFor={id}>{label}</label>
      {renderInput()}
    </div>
  );
}
