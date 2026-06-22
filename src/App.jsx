import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";


function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Homepage/>} />
      </Routes>
  );
}

export default App;
