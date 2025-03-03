import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Robot1 from "/rukyhore.png";
import Robot2 from "/robotlast1.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        const handleSignIn = async () => {
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
                console.error(
                  "Error inserting user data:",
                  insertError.message
                );
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

        handleSignIn();
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

  const handleProviderLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) {
      console.error("Error with provider login:", error.message);
    }
  };

  return (
    <>
      <div className="usergradient">
        <Navbar />
        <div className="relative min-h-screen usergradient text-white flex items-center justify-center p-4 overflow-hidden">
          <img
            src={Robot2}
            alt="Robot Left"
            className="absolute top-[0%]  left-[-22%] w-[50%] rotate-[30deg] object-cover"
          />

          {/* Right Robot */}
          <img
            src={Robot1}
            alt="Robot Right"
            className="absolute bottom-[-5%] right-[-20%] w-[50%] rotate-[-25deg] object-cover"
          />

          <div className="max-w-md w-full bg-white/5 p-8 rounded-lg shadow-lg text-center">
            <div className="space-y-4">
              <div className="w-full usergradient rounded-2xl">
                <button
                  onClick={() => handleProviderLogin("google")}
                  className="w-full py-2 px-4 text-white font-semibold userlvl"
                >
                  Přihlásit se přes Google
                </button>
              </div>
              <div className="w-full usergradient rounded-2xl">
                <button
                  onClick={() => handleProviderLogin("discord")}
                  className="w-full py-2 px-4 text-white font-semibold userlvl"
                >
                  Přihlásit se přes Discord
                </button>
              </div>
            </div>
            <Auth
              providers={[]}
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#0a0a0a", // zinc-950
                      brandAccent: "#18181b", // zinc-900
                      defaultButtonText: "#e2e8f0",
                      defaultButtonBackground: "#18181b", // zinc-900
                      defaultButtonHoverBackground: "#0a0a0a", // zinc-950
                      inputBackground: "#18181b", // zinc-900
                      inputBorder: "#27272a", // Slightly lighter zinc-800 for contrast
                      inputText: "#e2e8f0",
                    },
                  },
                },
              }}
              localization={{
                lang: "cz",
                variables: {
                  sign_in: {
                    email_label: "E-mailová adresa",
                    email_input_placeholder: "Zadejte svůj e-mail",
                    password_label: "Heslo",
                    password_input_placeholder: "Zadejte své heslo",
                    button_label: "Přihlásit se",
                    link_text: "Už máte účet? Přihlásit se zde.",
                  },
                  sign_up: {
                    email_label: "E-mailová adresa",
                    email_input_placeholder: "Zadejte svůj e-mail",
                    password_label: "Heslo",
                    password_input_placeholder: "Vytvořte si heslo",
                    button_label: "Zaregistrovat se",
                    link_text: "Nemáte u nás účet? Zaregistrujte se zde.",
                  },
                  forgotten_password: {
                    email_label: "E-mailová adresa",
                    email_input_placeholder:
                      "Zadejte svůj e-mail pro reset hesla",
                    button_label: "Resetovat heslo",
                    link_text: "Zapomenuté heslo?",
                  },
                  magic_link: {
                    email_input_placeholder:
                      "Zadejte svůj e-mail pro magický odkaz",
                    button_label: "Odeslat odkaz",
                    link_text: "Zpět na přihlášení",
                  },
                },
              }}
            />
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default LoginPage;
