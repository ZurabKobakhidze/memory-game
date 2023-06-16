import { Route, Routes, Link, Navigate } from "react-router-dom";
import SetupPage from './components/SetupPage';
import GamePage from './components/GamePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SetupPage />} />
      <Route path="/gamePage" element={<GamePage />} />
    </Routes>
  );
}

export default App;