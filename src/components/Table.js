import React, { useState } from "react";

/**
 * Table Component
 * Renders a table with data and provides functionalities for editing and deleting rows.
 *
 * Props:
 * - data (array): Array of objects representing rows of data.
 * - onDelete (function): Callback function to handle row deletion.
 * - onEdit (function): Callback function to handle row edits.
 */
function Table({ data, onDelete, onEdit }) {
  // Tracks the index of the row currently in edit mode
  const [editIndex, setEditIndex] = useState(null);

  // Stores the data being edited for the currently active row
  const [editData, setEditData] = useState({});

  /**
   * Handles the "Edit" button click for a specific row.
   * Loads the selected row's data into `editData` for editing.
   */
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditData(data[index]); // Load the selected row data into editData
  };

  /**
   * Handles the "Save" button click after editing.
   * Passes the updated data back to the parent via the `onEdit` callback.
   */
  const handleSaveClick = () => {
    onEdit(editIndex, editData); // Pass updated data back to the parent
    setEditIndex(null); // Exit edit mode
  };

  /**
   * Handles changes to input fields while editing.
   * Updates the corresponding field in the `editData` state.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value })); // Dynamically update field based on `name`
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {/* Dynamically generate table headers based on the keys of the first data object */}
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
          <th>Actions</th> {/* Additional column for action buttons */}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {/* Render table cells; display input fields if row is in edit mode */}
            {Object.keys(row).map((key, i) => (
              <td key={i}>
                {editIndex === index ? (
                  <input
                    type="text"
                    name={key} // Name corresponds to the object key
                    value={editData[key] || ""} // Display current value or empty string
                    onChange={handleInputChange} // Handle input field changes
                  />
                ) : (
                  row[key] // Display static value if not in edit mode
                )}
              </td>
            ))}
            <td>
              {/* Display action buttons: "Save" if editing, otherwise "Edit" */}
              {editIndex === index ? (
                <button
                  className="btn btn-success btn-sm"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleEditClick(index)}
                >
                  Edit
                </button>
              )}
              {/* "Delete" button to remove the row */}
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(index)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
