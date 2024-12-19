import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const MoodSummaryPage = () => {
  const navigate = useNavigate();
  const [moods, setMoods] = useState([]);
  const [moodCounts, setMoodCounts] = useState({
    Happy: 0,
    Neutral: 0,
    Sad: 0,
  });

  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem("moods")) || [];
    setMoods(savedMoods);

    const counts = savedMoods.reduce(
      (acc, mood) => {
        acc[mood.selectedMood] = (acc[mood.selectedMood] || 0) + 1;
        return acc;
      },
      { Happy: 0, Neutral: 0, Sad: 0 }
    );

    setMoodCounts(counts);
  }, []);

  const handleBackToEntryPage = () => {
    navigate("/");
  };

  return (
    <div className="bg-black flex flex-col w-full items-center h-screen text-white">
      <h1 className="text-xl mb-4 font-bold">Mood Summary</h1>

      {moods.length === 0 ? (
        <div className="mt-6 text-center">
          <p>No moods logged yet. Start by logging your mood!</p>
        </div>
      ) : (
        <div className="w-1/2 mt-6">
          <h2 className="text-lg font-bold mb-4">Mood Entries</h2>
          <div className="space-y-4 hide-scrollbar max-h-80 overflow-y-auto">
            {moods.map((entry, index) => (
              <div
                key={index}
                className="border-2 p-4 rounded-lg border-gray-700 "
              >
                <p>
                  <strong>Mood:</strong> {entry.selectedMood}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(entry.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Note:</strong> {entry.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {moods.length > 0 && (
        <div className="mt-6 w-1/2 p-4 border-2 rounded-lg border-gray-700">
          <h4 className="text-center text-xl mb-4 font-bold">Mood Trends</h4>
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <p className="font-bold">Happy</p>
              <div
                className="w-full bg-green-500 h-2"
                style={{
                  width: `${(moodCounts.Happy / moods.length) * 100}%`,
                }}
              ></div>
              <p>{moodCounts.Happy}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Neutral</p>
              <div
                className="w-full bg-yellow-500 h-2"
                style={{
                  width: `${(moodCounts.Neutral / moods.length) * 100}%`,
                }}
              ></div>
              <p>{moodCounts.Neutral}</p>
            </div>
            <div className="text-center">
              <p className="font-bold">Sad</p>
              <div
                className="w-full bg-red-500 h-2"
                style={{
                  width: `${(moodCounts.Sad / moods.length) * 100}%`,
                }}
              ></div>
              <p>{moodCounts.Sad}</p>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleBackToEntryPage}
        className="absolute bottom-6 left-6 rounded-full bg-blue-600 border px-5 py-2 flex text-white"
      >
        Back to Entry Page
      </button>
    </div>
  );
};

export default MoodSummaryPage;
