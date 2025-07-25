import { useEffect, useState } from "react";
import { useGlobalData } from "../Global";
import { supabase } from "../supabaseClient";

function InfoForm() {
  const { authUser, userData, loading } = useGlobalData();
  const [jmeno, setJmeno] = useState("");
  const [prijmeni, setPrijmeni] = useState("");
  const [prezdivka, setPrezdivka] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [formError, setFormError] = useState(null);

  const [errors, setErrors] = useState({
    jmeno: "",
    prijmeni: "",
    prezdivka: "",
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (authUser && userData) {
      if (authUser.app_metadata?.provider === "google") {
        const fullName = userData.name || "";
        const nameParts = fullName.split(" ");
        setJmeno(nameParts[0] || "");
        setPrijmeni(nameParts.slice(1).join(" ") || "");
      } else {
        setJmeno(userData.firstName || "");
        setPrijmeni(userData.lastName || "");
      }
      setPrezdivka(userData.nickname || "");
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
            setFormError("Couldn't check if your profile is complete.");
          } else if (data) {
            setIsVisible(!data.nameSet);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setFormError("An unexpected error occurred.");
      }
    }
    fetchData();
  }, [authUser]);

  useEffect(() => {
    const validateField = (value) => {
      return (
        value.length >= 3 && value.length <= 25 && /^[\p{L}0-9_]+$/u.test(value)
      );
    };

    let validFields = 0;
    const totalFields = 3;

    if (validateField(jmeno)) validFields++;
    if (validateField(prijmeni)) validFields++;
    if (validateField(prezdivka)) validFields++;

    setProgress((validFields / totalFields) * 100);
  }, [jmeno, prijmeni, prezdivka]);

  const validateInput = (field, value) => {
    if (value.length < 3) {
      return `Musí obsahovat alespoň 3 znaky`;
    } else if (value.length > 25) {
      return `Maximálně 25 znaků`;
    } else if (!/^[\p{L}0-9_]+$/u.test(value)) {
      return `Pouze písmena (včetně háčků a čárek), čísla a podtržítko`;
    }
    return "";
  };

  const handleInputChange = (field, value) => {
    const sanitizedValue = value.replace(/[^\p{L}0-9_]/gu, "");

    switch (field) {
      case "jmeno":
        setJmeno(sanitizedValue);
        setErrors({ ...errors, jmeno: validateInput(field, sanitizedValue) });
        break;
      case "prijmeni":
        setPrijmeni(sanitizedValue);
        setErrors({
          ...errors,
          prijmeni: validateInput(field, sanitizedValue),
        });
        break;
      case "prezdivka":
        setPrezdivka(sanitizedValue);
        setErrors({
          ...errors,
          prezdivka: validateInput(field, sanitizedValue),
        });
        break;
      default:
        break;
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const jmenoError = validateInput("jmeno", jmeno);
    const prijmeniError = validateInput("prijmeni", prijmeni);
    const prezdivkaError = validateInput("prezdivka", prezdivka);

    setErrors({
      jmeno: jmenoError,
      prijmeni: prijmeniError,
      prezdivka: prezdivkaError,
    });

    if (jmenoError || prijmeniError || prezdivkaError) {
      return;
    }

    if (!authUser) {
      console.error("No authenticated user found.");
      setFormError("You must be logged in to complete your profile.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("user")
        .update({
          name: jmeno,
          surname: prijmeni,
          nickname: prezdivka,
          nameSet: true,
        })
        .eq("authid", authUser.id);

      if (error) {
        setFormError("Failed to update your profile. Please try again.");
      } else {
        setIsVisible(false);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
      setFormError("An unexpected error occurred.");
    }
  }

  const handleZavri = async () => {
    try {
      if (!authUser) {
        return;
      }

      const { data, error } = await supabase
        .from("user")
        .update({ nameSet: true })
        .eq("authid", authUser.id);

      if (error) {
        console.error("Error updating user:", error.message);
        return;
      }

      setIsVisible(false);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-300">Načítání...</p>
      </div>
    );
  }

  return (
    <div className="info-form-container">
      {formError && (
        <div className="fixed inset-x-0 top-4 flex justify-center">
          <div className="bg-red-500 text-white px-4 py-2 rounded shadow-lg">
            {formError}
          </div>
        </div>
      )}

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-4xl bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden relative">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 bg-zinc-900 p-6 md:p-10 flex flex-col justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                  Great that you have registered!
                </h1>
                <p className="text-base md:text-xl text-gray-300 mb-8">
                  To offer you the best experience, we need a few more pieces of
                  information from you.
                </p>

                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-300">
                      Profile completeness
                    </span>
                    <span className="text-sm text-gray-300">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2.5">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 bg-zinc-800 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">
                    Pravidla pro vyplnění:
                  </h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      3-25 characters
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Only letters (including accents), numbers and underscore
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-1/2 bg-zinc-900 p-6 md:p-10 md:relative">
                <button
                  onClick={handleZavri}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
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

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
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
                        onChange={(e) =>
                          handleInputChange("jmeno", e.target.value)
                        }
                        placeholder="Karel"
                        required
                        className={`w-full h-12 px-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 ${
                          errors.jmeno
                            ? "border border-red-500 focus:ring-red-500"
                            : "focus:ring-purple-600"
                        }`}
                      />
                      {errors.jmeno && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.jmeno}
                        </p>
                      )}
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
                        onChange={(e) =>
                          handleInputChange("prijmeni", e.target.value)
                        }
                        placeholder="Novák"
                        required
                        className={`w-full h-12 px-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 ${
                          errors.prijmeni
                            ? "border border-red-500 focus:ring-red-500"
                            : "focus:ring-purple-600"
                        }`}
                      />
                      {errors.prijmeni && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.prijmeni}
                        </p>
                      )}
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
                      onChange={(e) =>
                        handleInputChange("prezdivka", e.target.value)
                      }
                      placeholder="KarelNovak123"
                      required
                      className={`w-full h-12 px-4 bg-zinc-800 text-white rounded-full focus:outline-none focus:ring-2 ${
                        errors.prezdivka
                          ? "border border-red-500 focus:ring-red-500"
                          : "focus:ring-purple-600"
                      }`}
                    />
                    {errors.prezdivka && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.prezdivka}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      type="submit"
                      disabled={progress < 100}
                      className={`w-full h-12 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600 ${
                        progress < 100
                          ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {progress < 100
                        ? "Complete registration"
                        : "Start exploring"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfoForm;
