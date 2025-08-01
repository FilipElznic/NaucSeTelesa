import { supabase } from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Robot1 from "/rukyhore.webp";
import Robot2 from "/robotlast1.webp";
import "../App.css";

import { toast, ToastContainer } from "react-toastify";

function CustomLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    // Check if user was redirected from a protected route
    if (location.state?.protected) {
      toast.error("You must log in to access this page", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [location]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        handleUserData(session);
      } else if (event === "SIGNED_OUT") {
      }
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [navigate]);

  const handleUserData = async (session) => {
    try {
      const { data: existingUser } = await supabase
        .from("user")
        .select("authid")
        .eq("authid", session.user.id)
        .single();

      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("user")
          .insert([{ authid: session.user.id }]);

        if (insertError) {
          console.error("Error inserting user data:", insertError.message);
        }
      }

      navigate("/main-page");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/",
        },
      });

      if (error) {
        toast.error(`Registration failed: ${error.message}`);
      } else {
        toast.success(
          "Registration successful! Check your email for confirmation."
        );
        setIsLogin(true);
      }
    } catch (err) {
      toast.error("An unexpected error occurred during registration");
      console.error("Unexpected error during sign up:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(`Login failed: ${error.message}`);
      }
      // Successful login will trigger onAuthStateChange which handles navigation
    } catch (err) {
      toast.error("An unexpected error occurred during login");
      console.error("Unexpected error during sign in:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) {
        toast.error(`Password reset failed: ${error.message}`);
      } else {
        toast.success(
          "Password reset instructions have been sent to your email"
        );
        setForgotPassword(false);
      }
    } catch (err) {
      toast.error("An unexpected error occurred during password reset");
      console.error("Unexpected error during password reset:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderForgotPasswordForm = () => {
    return (
      <div className="w-full transition-all duration-500 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-left">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to reset password"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-md transition-colors usergradient userlvl"
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>

          <div className="text-left mt-4">
            <button
              type="button"
              onClick={() => setForgotPassword(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    );
  };

  const renderLoginForm = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-left">Login</h2>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-md transition-colors usergradient userlvl"
            >
              {loading ? "Processing..." : "Sign In"}
            </button>

            <div className="flex justify-end text-sm mt-4">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center border-l border-zinc-700 pl-8 hidden md:flex">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Don&apos;t have an account?
            </h3>
            <p className="text-zinc-400 mb-6">
              Create a free account and get access to all our services.
            </p>
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(false);
              }}
              className="py-2 px-8 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-md transition-colors"
            >
              Register
            </button>
          </div>
        </div>

        {/* Mobile only register link */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-zinc-400">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(false);
              }}
              className="text-white font-semibold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    );
  };

  const renderRegisterForm = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out">
        <div>
          <h2 className="text-2xl font-bold mb-6 text-left">Register</h2>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-md transition-colors usergradient userlvl"
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center border-l border-zinc-700 pl-8 hidden md:flex">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">
              Already have an account?
            </h3>
            <p className="text-zinc-400 mb-6">
              Sign in to your account and continue using our services.
            </p>
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(true);
              }}
              className="py-2 px-8 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Mobile only login link */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-zinc-400">
            Already have an account?{" "}
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(true);
              }}
              className="text-white font-semibold hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    );
  };

  const renderForm = () => {
    if (forgotPassword) {
      return renderForgotPasswordForm();
    } else if (isLogin) {
      return renderLoginForm();
    } else {
      return renderRegisterForm();
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="relative min-h-screen text-white flex items-center justify-center p-4 overflow-hidden">
        <img
          src={Robot2}
          alt="Robot Left"
          className="absolute top-[0%] left-[-22%] w-[50%] rotate-[30deg] object-cover"
        />

        <img
          src={Robot1}
          alt="Robot Right"
          className="absolute bottom-[-5%] right-[-20%] w-[50%] rotate-[-25deg] object-cover"
        />

        <div className="max-w-4xl w-full bg-white/5 p-8 rounded-lg shadow-lg z-10">
          {renderForm()}
        </div>
      </div>
    </>
  );
}

export default CustomLoginPage;
