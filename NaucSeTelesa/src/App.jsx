import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, useEffect, useState, lazy } from "react";
import { AuthProvider } from "./AuthContext";
import { ProtectedRoute, RedirectIfLoggedIn } from "./ProtectedRoute";
import { GlobalProvider } from "./Global";
import FadeInWrapper from "./Components/FadeInWrapper";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";

// Lazy load all page components
const LoginPage = lazy(() => import("./pages/loginPage.jsx"));
const SuccessPage = lazy(() => import("./pages/successPage.jsx"));
const TailwindTest = lazy(() => import("./pages/TailwindTest.jsx"));
const UserPage = lazy(() => import("./pages/userpage.jsx"));
const TaskPage = lazy(() => import("./pages/taskPage.jsx"));
const TelesaPage = lazy(() => import("./pages/telesaPage.jsx"));
const AboutPage = lazy(() => import("./pages/aboutPage.jsx"));
const Profile = lazy(() => import("./Components/Profile.jsx"));
const PomocPage = lazy(() => import("./Components/Help.jsx"));
const NotFoundPage = lazy(() => import("./pages/notFoundpage.jsx"));
const Privacy = lazy(() => import("./pages/privacy.jsx"));

// Loading component for suspense fallback
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Hide loading animation only after auth state is checked and app is fully initialized
    // This will be handled by the nested providers
    const initializeApp = async () => {
      try {
        // Just set app ready here - actual auth checks will happen in AuthProvider
        setIsAppReady(true);

        // Don't hide loading animation yet - we'll do that after auth checks
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsAppReady(true);
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
          <AppContent />
        </GlobalProvider>
      </AuthProvider>
    </div>
  );
}

// Extract AppContent component to access auth/global context
function AppContent() {
  // This component will have access to auth and global context
  useEffect(() => {
    // This runs after auth and user data has been fetched in AuthProvider and GlobalProvider
    // Only hide the loading animation after ensuring both providers have initialized
    if (typeof window.hideLoadingAnimation === "function") {
      window.hideLoadingAnimation();
    }
  }, []);

  return (
    <FadeInWrapper>
      <Router>
        <Navbar />
        <main className="min-h-screen">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public route for login */}
              <Route path="/login" element={<LoginPage />} />

              <Route path="/privacy-policy" element={<Privacy />} />

              {/* Protected routes */}
              <Route
                path="/user"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <SuccessPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/help" element={<PomocPage />} />
              <Route
                path="/tailwind"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <TailwindTest />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <TaskPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/solids"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <TelesaPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/main-page"
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
                  <RedirectIfLoggedIn redirectTo="/main-page">
                    <UserPage />
                  </RedirectIfLoggedIn>
                }
              />

              {/* Legacy Czech routes - redirect to English equivalents */}
              <Route
                path="/projekt"
                element={<Navigate to="/about" replace />}
              />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <Navigate to="/profile" replace />
                  </ProtectedRoute>
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
  );
}

export default App;
