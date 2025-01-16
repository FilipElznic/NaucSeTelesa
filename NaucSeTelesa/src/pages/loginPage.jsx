import { supabase } from "../supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg text-center">
        <div className="space-y-4">
          <button
            onClick={() => handleProviderLogin("google")}
            className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200"
          >
            Přihlásit se přes Google
          </button>
          <button
            onClick={() => handleProviderLogin("discord")}
            className="w-full py-2 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition duration-200"
          >
            Přihlásit se přes Discord
          </button>
        </div>
        <Auth
          providers={[]}
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0f172a",
                  brandAccent: "#1e3a8a",
                  defaultButtonText: "#e2e8f0",
                  defaultButtonBackground: "#1e293b",
                  defaultButtonHoverBackground: "#111827",
                  inputBackground: "#1e293b",
                  inputBorder: "#334155",
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
                email_input_placeholder: "Zadejte svůj e-mail pro reset hesla",
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
  );
}

export default LoginPage;
