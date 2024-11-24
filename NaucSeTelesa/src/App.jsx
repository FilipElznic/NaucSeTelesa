import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage2 from "./pages/ReginsterPage2";
import Login2 from "./pages/LoginPage2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login2 />} />
        <Route path="/Login2" element={<RegisterPage2 />} />
      </Routes>
    </Router>
  );
}

export default App;
