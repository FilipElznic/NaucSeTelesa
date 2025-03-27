import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/loginPage";
import SuccessPage from "./pages/successPage";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import TailwindTest from "./pages/TailwindTest";
import UserPage from "./pages/userpage";
import TaskPage from "./pages/taskPage";
import TelesaPage from "./pages/telesaPage";
import AboutPage from "./pages/aboutPage";
import { GlobalProvider } from "./Global"; // Používáme pojmenovaný export
import Profile from "./Components/Profile";
import PomocPage from "./pages/pomocPage";
import FadeInWrapper from "./Components/FadeInWrapper";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <FadeInWrapper>
          <Router>
            <Routes>
              {/* Public route for login */}
              <Route path="/prihlaseni" element={<LoginPage />} />

              {/* Protected routes */}
              <Route
                path="/uzivatel"
                element={
                  <ProtectedRoute redirectTo="/prihlaseni">
                    <SuccessPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pomoc"
                element={
                  <ProtectedRoute redirectTo="/prihlaseni">
                    <PomocPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tailwind"
                element={
                  <ProtectedRoute redirectTo="/prihlaseni">
                    <TailwindTest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ukoly"
                element={
                  <ProtectedRoute redirectTo="/prihlaseni">
                    <TaskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/telesa"
                element={
                  <ProtectedRoute redirectTo="/prihlaseni">
                    <TelesaPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/projekt" element={<AboutPage />} />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute redirectTo="/prihlaseni">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/success"
                element={
                  <ProtectedRoute redirectTo="/">
                    <SuccessPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect logged-in users from the root ("/") */}
              <Route
                path="/"
                element={
                  <RedirectIfLoggedIn redirectTo="/success">
                    <UserPage />
                  </RedirectIfLoggedIn>
                }
              />
            </Routes>
          </Router>
        </FadeInWrapper>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
