import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, useEffect, useState, lazy } from "react";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import { GlobalProvider } from "./Global";
import FadeInWrapper from "./Components/FadeInWrapper";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Lazy load all page components
const LoginPage = lazy(() => import("./pages/loginPage"));
const SuccessPage = lazy(() => import("./pages/successPage"));
const TailwindTest = lazy(() => import("./pages/TailwindTest"));
const UserPage = lazy(() => import("./pages/userpage"));
const TaskPage = lazy(() => import("./pages/taskPage"));
const TelesaPage = lazy(() => import("./Components/Telesa"));
const AboutPage = lazy(() => import("./pages/aboutPage"));
const Profile = lazy(() => import("./Components/Profile"));
const PomocPage = lazy(() => import("./Components/Help"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

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

  if (!isAppReady) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-container">
      <AuthProvider>
        <GlobalProvider>
          <FadeInWrapper>
            <Router>
              <Navbar />
              <main className="min-h-screen">
                <Suspense fallback={<LoadingSpinner />}>
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
                </Suspense>
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
