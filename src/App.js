import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import DynamicForm from "./components/DynamicForm";
import Table from "./components/Table";
import "./App.css";

/**
 * App Component: The root component managing the workflow of the application.
 * Handles the state, form submissions, edit and delete operations.
 */
function App() {
  // Stores the list of submitted data
  const [submittedData, setSubmittedData] = useState([]);

  // Stores success messages to notify users about actions
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Handles form submissions from the DynamicForm component.
   * Adds the new data to the table and displays a success message.
   */
  const handleFormSubmit = (data) => {
    setSubmittedData((prevData) => [...prevData, data]);
    setSuccessMessage("Entry added successfully!");
  };

  /**
   * Handles the delete action for a specific table entry.
   * Removes the item from the list and displays a success message.
   */
  const handleDelete = (index) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
    setSuccessMessage("Entry deleted successfully.");
  };

  /**
   * Handles the edit action for a specific table entry.
   * Updates the item in the list and displays a success message.
   */
  const handleEdit = (index, newData) => {
    const updatedData = [...submittedData];
    updatedData[index] = newData;
    setSubmittedData(updatedData);
    setSuccessMessage("Changes saved successfully.");
  };

  return (
    <div className="App">
      {/* Renders the navigation bar */}
      <Header />
      <div className="container my-4">
        {/* Renders the form for user input */}
        <DynamicForm onSubmit={handleFormSubmit} />

        {/* Displays success messages */}
        {successMessage && (
          <div className="alert alert-success my-3">{successMessage}</div>
        )}

        {/* Renders the table if there is any submitted data */}
        {submittedData.length > 0 && (
          <Table
            data={submittedData}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </div>
      {/* Renders the footer */}
      <Footer />
    </div>
  );
}

export default App;
