import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/loginPage";
import SuccessPage from "./pages/successPage";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import TailwindTest from "./pages/TailwindTest";
import RegisterPage2 from "./pages/ReginsterPage2";
import Login2 from "./pages/LoginPage2";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/tailwind" element={<TailwindTest />} />
        <Route path="/" element={<RegisterPage2 />} />
        <Route path="/Login2" element={<Login2 />} />
      </Routes>
    </Router>
  );
}

export default App;
