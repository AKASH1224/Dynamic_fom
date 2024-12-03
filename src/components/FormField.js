import React from "react";

/**
 * FormField Component
 * Dynamically renders a form field based on the provided field metadata.
 *
 * @param {Object} field - Metadata for the form field (name, type, label, options, required).
 * @param {Function} onChange - Callback function triggered when the field value changes.
 */
function FormField({ field, onChange }) {
  // Destructure metadata from the field object
  const { name, type, label, options, required } = field;

  return (
    <div className="mb-3">
      {/* Render a label for the field. Append a red asterisk (*) for required fields */}
      <label htmlFor={name} className="form-label">
        {label} {required && <span className="text-danger">*</span>}
      </label>

      {/* Conditionally render input elements based on the field type */}
      {type === "dropdown" ? (
        // Render a dropdown (select element) if the field type is "dropdown"
        <select
          id={name} // Unique identifier for the dropdown
          name={name} // Field name used for form data
          className="form-select" // Bootstrap styling for select elements
          onChange={onChange} // Trigger the onChange handler when value changes
          required={required} // Add required validation if specified
        >
          {/* Default placeholder option */}
          <option value="">Select...</option>
          {/* Dynamically generate dropdown options */}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        // Render a standard input field for other types
        <input
          id={name} // Unique identifier for the input
          name={name} // Field name used for form data
          type={type} // Input type (text, number, password, etc.)
          className="form-control" // Bootstrap styling for inputs
          onChange={onChange} // Trigger the onChange handler when value changes
          required={required} // Add required validation if specified
        />
      )}
    </div>
  );
}

export default FormField;
