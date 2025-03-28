import { useEffect, useState } from "react";
import { useGlobalData } from "../Global";
import { supabase } from "../supabaseClient";

function InfoForm() {
  const { authUser, userData, loading } = useGlobalData();
  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [prezdivka, setPrezdivka] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Check if user is available and pre-fill name and surname from userData
  useEffect(() => {
    if (authUser && userData) {
      if (authUser.app_metadata.provider === "google") {
        const fullName = userData.name || "";
        const nameParts = fullName.split(" ");
        setJmeno(nameParts[0] || ""); // First name
        setPrijmeni(nameParts.slice(1).join(" ") || ""); // Last name
      } else {
        setJmeno(userData.firstName || ""); // Pre-fill with existing first name
        setPrijmeni(userData.lastName || ""); // Pre-fill with existing last name
      }
      setPrezdivka(userData.nickname || ""); // Pre-fill nickname if available
    }
  }, [authUser, userData]);

  useEffect(() => {
    async function fetchData() {
      try {
        if (authUser) {
          const { data, error } = await supabase
            .from("user")
            .select("nameSet")
            .eq("authid", authUser.id)
            .single();

          if (error) {
            console.error("Error fetching data:", error);
          } else if (data) {
            setIsVisible(!data.nameSet);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      }
    }
    fetchData();
  }, [authUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!authUser) {
      console.error("No authenticated user found.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user")
        .update({
          name: jmeno,
          surname: prijmeni,
          nickname: prezdivka,
        })
        .eq("authid", authUser.id);

      if (error) {
        console.error("Error updating data:", error);
      } else {
        console.log("Data updated successfully:", data);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
    }
    Zavri();
  }

  const Zavri = async () => {
    try {
      const { data, error } = await supabase
        .from("user")
        .update({ nameSet: true })
        .eq("authid", authUser.id);

      if (error) {
        console.error("Error updating user:", error.message);
        return;
      }

      console.log("Update successful:", data);
      setIsVisible(false);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  const handleHide = () => {
    Zavri();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-300">Načítání...</p>
      </div>
    );
  }

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 ">
          <div className="w-full max-w-4xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="flex flex-col md:flex-row">
              {/* Left Side - Welcome Message */}
              <div className="w-full md:w-1/2 bg-zinc-900 p-6 md:p-10 flex flex-col justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  Skvělé, že jste se zaregistrovali!
                </h1>
                <p className="text-base md:text-xl text-gray-300">
                  Abychom vám mohli nabídnout co nejlepší, potřebujeme od vás
                  ještě pár drobných informací.
                </p>
              </div>

              {/* Right Side - Form */}
              <div className="w-full md:w-1/2 bg-zinc-900 p-6 md:p-10 md:relative">
                {/* Close Button */}
                <button
                  onClick={handleHide}
                  className="absolute  top-4 right-4 text-white hover:text-gray-300 transition-colors"
                  aria-label="Zavřít"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="jmeno"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Jméno
                      </label>
                      <input
                        id="jmeno"
                        type="text"
                        value={jmeno}
                        onChange={(e) => setJmeno(e.target.value)}
                        placeholder="Karel"
                        required
                        className="w-full h-12 px-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prijmeni"
                        className="block text-sm font-medium text-white mb-2"
                      >
                        Přijmení
                      </label>
                      <input
                        id="prijmeni"
                        type="text"
                        value={prijmeni}
                        onChange={(e) => setPrijmeni(e.target.value)}
                        placeholder="Novák"
                        required
                        className="w-full h-12 px-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="prezdivka"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Přezdívka
                    </label>
                    <input
                      id="prezdivka"
                      type="text"
                      value={prezdivka}
                      onChange={(e) => setPrezdivka(e.target.value)}
                      placeholder="KarelNovak123"
                      required
                      className="w-full h-12 px-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                  </div>

                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="w-full md:w-1/2 h-12 bg-purple-950 text-white rounded-full hover:bg-purple-900 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      Začít objevovat
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoForm;
