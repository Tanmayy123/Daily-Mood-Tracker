import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import happy from "../assets/happy.jpg";
import neutral from "../assets/neutral.jpg";
import sad from "../assets/sad1.png";

const MoodEntryPage = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setDescription("");
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveMood = () => {
    if (!selectedMood || !description) {
      toast.error("Please select a mood and enter a note!");
      return;
    }

    const newMood = {
      selectedMood,
      description,
      date: new Date().toISOString(),
    };

    const existingMoods = JSON.parse(localStorage.getItem("moods")) || [];

    existingMoods.push(newMood);

    localStorage.setItem("moods", JSON.stringify(existingMoods));

    toast.success("Mood saved successfully!");

    setSelectedMood(null);
    setDescription("");
  };

  const handleViewSummary = () => {
    navigate("/summary");
  };

  return (
    <div className="bg-black flex flex-col w-full items-center h-screen text-white">
      <h1 className="text-2xl font-bold mt-10">Daily Mood Tracker</h1>

      <div className="mt-10 flex gap-6">
        <div
          onClick={() => handleMoodClick("Happy")}
          className="w-1/3 h-40 rounded-xl border-2 relative cursor-pointer"
        >
          <img
            className="w-full h-full object-cover rounded-xl"
            src={happy}
            alt="Happy Mood"
          />
          <h3 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white">
            Happy
          </h3>
        </div>

        <div
          onClick={() => handleMoodClick("Neutral")}
          className="w-1/3 h-40 rounded-xl border-2 relative cursor-pointer"
        >
          <img
            className="w-full h-full object-cover rounded-xl"
            src={neutral}
            alt="Neutral Mood"
          />
          <h3 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white">
            Neutral
          </h3>
        </div>

        <div
          onClick={() => handleMoodClick("Sad")}
          className="w-1/3 h-40 rounded-xl border-2 relative cursor-pointer"
        >
          <img
            className="w-full h-full object-cover rounded-xl"
            src={sad}
            alt="Sad Mood"
          />
          <h3 className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xl font-bold text-white">
            Sad
          </h3>
        </div>
      </div>

      {selectedMood && (
        <div className="mt-6 w-1/2 p-4 border-2 rounded-lg border-gray-700">
          <h4 className="text-center text-xl mb-4 font-bold text-white">
            Why are you feeling {selectedMood}?
          </h4>
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder={`Enter why you're feeling ${selectedMood.toLowerCase()}...`}
            className="w-full p-2 mb-4 text-slate-50 border-gray-300 shadow-xl bg-gray-700 focus:outline-none border rounded-lg"
            rows="4"
          />
        </div>
      )}

      <button
        onClick={handleSaveMood}
        className="mt-6 rounded-full bg-blue-500 text-white px-6 py-2"
      >
        Save Mood
      </button>

      <button
        onClick={handleViewSummary}
        className="mt-4 rounded-full bg-green-500 text-white px-6 py-2"
      >
        View Summary
      </button>

      <ToastContainer />
    </div>
  );
};

export default MoodEntryPage;
