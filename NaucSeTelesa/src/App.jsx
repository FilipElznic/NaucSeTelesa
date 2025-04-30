import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import LoginPage from "./pages/loginPage";
import SuccessPage from "./pages/successPage";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import TailwindTest from "./pages/TailwindTest";
import UserPage from "./pages/userpage";
import TaskPage from "./pages/taskPage";
import TelesaPage from "./Components/Telesa";
import AboutPage from "./pages/aboutPage";
import { GlobalProvider } from "./Global";
import Profile from "./Components/Profile";
import PomocPage from "./Components/Help";
import FadeInWrapper from "./Components/FadeInWrapper";
import NotFoundPage from "./pages/NotFoundPage"; // Import the new 404 page
import Navbar from "./components/Navbar"; // Import the Navbar component
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Perform any initial data loading or authentication checks here
    const initializeApp = async () => {
      try {
        // Example: Check authentication status

        // Any other initialization logic...

        // Mark the app as ready
        setIsAppReady(true);

        // Hide the loading animation
        if (typeof window.hideLoadingAnimation === "function") {
          window.hideLoadingAnimation();
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        // Still hide loading animation even if there's an error
        if (typeof window.hideLoadingAnimation === "function") {
          window.hideLoadingAnimation();
        }
      }
    };

    initializeApp();
  }, []);
  return (
    <div className="app-container">
      <AuthProvider>
        <GlobalProvider>
          <FadeInWrapper>
            <Router>
              <Navbar /> {/* Add Navbar here, outside of Routes */}
              <main>
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
                  <Route path="/pomoc" element={<PomocPage />} />
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

                  {/* Catch-all 404 route - place this LAST */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
              </main>
            </Router>
          </FadeInWrapper>
        </GlobalProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
