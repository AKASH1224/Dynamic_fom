import React from "react";

/**
 * ProgressBar Component
 * This component displays a dynamic progress bar using Bootstrap styles.
 *
 * Props:
 * - progress (number): The current progress percentage (0 to 100).
 */
function ProgressBar({ progress }) {
  return (
    <div className="progress mb-3">
      {/* Inner progress bar with dynamic width and accessible attributes */}
      <div
        className="progress-bar"
        role="progressbar" // Defines the role as a progress bar for screen readers
        style={{ width: `${progress}%` }} // Dynamically sets the width based on progress
        aria-valuenow={progress} // Current progress value for accessibility
        aria-valuemin="0" // Minimum value for the progress bar
        aria-valuemax="100" // Maximum value for the progress bar
      >
        {/* Display the progress percentage rounded to the nearest whole number */}
        {Math.round(progress)}%
      </div>
    </div>
  );
}

export default ProgressBar;
