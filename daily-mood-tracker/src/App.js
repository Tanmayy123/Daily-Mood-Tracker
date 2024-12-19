import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MoodEntryPage from "./pages/MoodEntryPage";
import MoodSummaryPage from "./pages/MoodSummaryPage";
import Notfound from "./components/Notfound";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MoodEntryPage />} />
        <Route path="/summary" element={<MoodSummaryPage />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
