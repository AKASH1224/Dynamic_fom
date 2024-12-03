import React, { useState, useEffect } from "react";
import FormField from "./FormField"; // Component to render individual form fields
import ProgressBar from "./ProgressBar"; // Component to show progress based on filled form fields

// Mock API response to simulate different form structures
const API_RESPONSES = {
  "User Information": {
    fields: [
      { name: "firstName", type: "text", label: "First Name", required: true },
      { name: "lastName", type: "text", label: "Last Name", required: true },
      { name: "age", type: "number", label: "Age", required: false },
    ],
  },
  "Address Information": {
    fields: [
      { name: "street", type: "text", label: "Street", required: true },
      { name: "city", type: "text", label: "City", required: true },
      {
        name: "state",
        type: "dropdown",
        label: "State",
        options: ["California", "Texas", "New York"], // Options for dropdown
        required: true,
      },
      { name: "zipCode", type: "text", label: "Zip Code", required: false },
    ],
  },
  "Payment Information": {
    fields: [
      {
        name: "cardNumber",
        type: "text",
        label: "Card Number",
        required: true,
      },
      {
        name: "expiryDate",
        type: "date",
        label: "Expiry Date",
        required: true,
      },
      { name: "cvv", type: "password", label: "CVV", required: true },
      {
        name: "cardholderName",
        type: "text",
        label: "Cardholder Name",
        required: true,
      },
    ],
  },
};

// DynamicForm Component: Handles form selection, field rendering, and form submission
function DynamicForm({ onSubmit }) {
  // State to track the selected form type
  const [formType, setFormType] = useState("");

  // State to store the form fields for the selected form type
  const [formFields, setFormFields] = useState([]);

  // State to manage the data entered by the user in the form
  const [formData, setFormData] = useState({});

  // State to track progress based on the number of required fields filled
  const [progress, setProgress] = useState(0);

  // Effect to update form fields when the form type changes
  useEffect(() => {
    if (formType) {
      const response = API_RESPONSES[formType]; // Fetch the fields for the selected form type
      setFormFields(response.fields); // Set fields in the state
      setFormData({}); // Reset form data when the form type changes
    }
  }, [formType]);

  /**
   * Handles changes to form input fields.
   * Updates the form data and recalculates progress based on required fields.
   */
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract field name and value
    setFormData({ ...formData, [name]: value }); // Update the form data state

    // Calculate progress by checking the number of required fields filled
    const requiredFields = formFields.filter((field) => field.required); // Get all required fields
    const filledFields = requiredFields.filter((field) => formData[field.name]); // Count filled fields
    setProgress((filledFields.length / requiredFields.length) * 100); // Update progress percentage
  };

  /**
   * Handles form submission.
   * Prevents default behavior and sends the form data to the parent component.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    onSubmit(formData); // Send form data to the parent component
    alert("Form submitted successfully!"); // Show success message
  };

  return (
    <div>
      {/* Dropdown to select the form type */}
      <div className="mb-3">
        <label htmlFor="formType" className="form-label">
          Select Form Type
        </label>
        <select
          id="formType"
          className="form-select"
          value={formType}
          onChange={(e) => setFormType(e.target.value)} // Update form type on selection
        >
          <option value="">Select...</option>
          {Object.keys(API_RESPONSES).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Render the form if fields are available */}
      {formFields.length > 0 && (
        <form onSubmit={handleSubmit}>
          {/* Loop through form fields and render them using the FormField component */}
          {formFields.map((field) => (
            <FormField key={field.name} field={field} onChange={handleChange} />
          ))}

          {/* Render a progress bar to indicate how much of the form is completed */}
          <ProgressBar progress={progress} />

          {/* Submit button */}
          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default DynamicForm;
