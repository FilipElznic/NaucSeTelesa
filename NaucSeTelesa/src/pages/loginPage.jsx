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
      toast.error("Pro přístup na tuto stránku se musíte přihlásit", {
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
        console.log("User signed out");
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
        } else {
          console.log("User data inserted successfully");
        }
      } else {
        console.log("User already exists, no data inserted");
      }

      navigate("/success");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleProviderLogin = async (provider) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin + "/success",
        },
      });

      if (error) {
        toast.error(`Přihlášení přes ${provider} selhalo: ${error.message}`);
        console.error("Error with provider login:", error.message);
      }
    } catch (err) {
      toast.error("Nastala neočekávaná chyba při přihlášení");
      console.error("Unexpected error during provider login:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vyplňte prosím všechna pole");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + "/success",
        },
      });

      if (error) {
        toast.error(`Registrace selhala: ${error.message}`);
      } else {
        toast.success(
          "Registrace úspěšná! Zkontrolujte svůj e-mail pro potvrzení."
        );
        setIsLogin(true);
      }
    } catch (err) {
      toast.error("Nastala neočekávaná chyba při registraci");
      console.error("Unexpected error during sign up:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Vyplňte prosím všechna pole");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(`Přihlášení selhalo: ${error.message}`);
      }
      // Successful login will trigger onAuthStateChange which handles navigation
    } catch (err) {
      toast.error("Nastala neočekávaná chyba při přihlášení");
      console.error("Unexpected error during sign in:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Zadejte prosím svůj e-mail");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/reset-password",
      });

      if (error) {
        toast.error(`Reset hesla selhal: ${error.message}`);
      } else {
        toast.success("Pokyny k resetování hesla byly odeslány na váš e-mail");
        setForgotPassword(false);
      }
    } catch (err) {
      toast.error("Nastala neočekávaná chyba při resetování hesla");
      console.error("Unexpected error during password reset:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderForgotPasswordForm = () => {
    return (
      <div className="w-full transition-all duration-500 ease-in-out">
        <h2 className="text-2xl font-bold mb-6 text-left">Obnovit heslo</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="text-left">
            <label className="block text-sm font-medium mb-1">
              E-mailová adresa
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Zadejte svůj e-mail pro reset hesla"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-md transition-colors usergradient userlvl"
          >
            {loading ? "Odesílám..." : "Resetovat heslo"}
          </button>

          <div className="text-left mt-4">
            <button
              type="button"
              onClick={() => setForgotPassword(false)}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Zpět na přihlášení
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
          <h2 className="text-2xl font-bold mb-6 text-left">Přihlášení</h2>

          <div className="space-y-4 mb-6">
            <div className="w-full usergradient rounded-2xl">
              <button
                type="button"
                onClick={() => handleProviderLogin("google")}
                disabled={loading}
                className="w-full py-2 px-4 text-white font-semibold userlvl"
              >
                Přihlásit se přes Google
              </button>
            </div>
            <div className="w-full usergradient rounded-2xl">
              <button
                type="button"
                onClick={() => handleProviderLogin("discord")}
                disabled={loading}
                className="w-full py-2 px-4 text-white font-semibold userlvl"
              >
                Přihlásit se přes Discord
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-400">nebo</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium mb-1">
                E-mailová adresa
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Zadejte svůj e-mail"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium mb-1">Heslo</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Zadejte své heslo"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-md transition-colors usergradient userlvl"
            >
              {loading ? "Zpracovávám..." : "Přihlásit se"}
            </button>

            <div className="flex justify-end text-sm mt-4">
              <button
                type="button"
                onClick={() => setForgotPassword(true)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Zapomenuté heslo?
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center border-l border-zinc-700 pl-8 hidden md:flex">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Nemáte u nás účet?</h3>
            <p className="text-zinc-400 mb-6">
              Vytvořte si účet zdarma a získejte přístup ke všem našim službám.
            </p>
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(false);
              }}
              className="py-2 px-8 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-md transition-colors"
            >
              Zaregistrovat se
            </button>
          </div>
        </div>

        {/* Mobile only register link */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-zinc-400">
            Nemáte u nás účet?{" "}
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(false);
              }}
              className="text-white font-semibold hover:underline"
            >
              Zaregistrovat se
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
          <h2 className="text-2xl font-bold mb-6 text-left">Registrace</h2>

          <div className="space-y-4 mb-6">
            <div className="w-full usergradient rounded-2xl">
              <button
                type="button"
                onClick={() => handleProviderLogin("google")}
                disabled={loading}
                className="w-full py-2 px-4 text-white font-semibold userlvl"
              >
                Registrovat přes Google
              </button>
            </div>
            <div className="w-full usergradient rounded-2xl">
              <button
                type="button"
                onClick={() => handleProviderLogin("discord")}
                disabled={loading}
                className="w-full py-2 px-4 text-white font-semibold userlvl"
              >
                Registrovat přes Discord
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-zinc-900 text-zinc-400">nebo</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-medium mb-1">
                E-mailová adresa
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Zadejte svůj e-mail"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <div className="text-left">
              <label className="block text-sm font-medium mb-1">Heslo</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Vytvořte si heslo"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-zinc-900 hover:bg-zinc-950 text-white font-semibold rounded-md transition-colors usergradient userlvl"
            >
              {loading ? "Zpracovávám..." : "Zaregistrovat se"}
            </button>
          </form>
        </div>

        <div className="flex flex-col justify-center items-center border-l border-zinc-700 pl-8 hidden md:flex">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Už máte účet?</h3>
            <p className="text-zinc-400 mb-6">
              Přihlaste se ke svému účtu a pokračujte v používání našich služeb.
            </p>
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(true);
              }}
              className="py-2 px-8 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-md transition-colors"
            >
              Přihlásit se
            </button>
          </div>
        </div>

        {/* Mobile only login link */}
        <div className="text-center mt-4 md:hidden">
          <p className="text-zinc-400">
            Už máte účet?{" "}
            <button
              onClick={() => {
                setEmail("");
                setPassword("");
                setIsLogin(true);
              }}
              className="text-white font-semibold hover:underline"
            >
              Přihlásit se
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
