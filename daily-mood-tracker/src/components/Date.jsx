import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { MoodSummaryPage } from "../pages/MoodEntryPage";

function Date() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>Enter Date</h1>

      <DatePicker
        className="text-white bg-slate-800 rounded-lg border border-gray-600 px-5 py-2" // Fixed border color
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
      />

      {selectedDate && (
        <div className="mt-4">
          <p className="text-white">
            date: {selectedDate.toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
}

export default Date;
